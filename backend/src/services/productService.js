const Product = require('../models/product')
const productDAO = require('../database/productDAO')
const fs = require('fs')

const service = {}

/**
 * Creates a new product
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
service.create = async (req, res, next) => {
  const newProduct = await service.getProductFromRequest(req)
  try {
    await productDAO.create(newProduct, req.files)
  } catch (error) {
    // Try deleting the newly uploaded files.
    // Maybe not save them at all if not need be?
    // TODO: shouldn't have to check if req.files exist, needs to use models to pre-exist.
    // But keep it here for now.
    if (req.files) {
      req.files.forEach(file => fs.unlinkSync(file.path))
    }
    throw error
  }
}

/**
 * Updates a product
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
service.update = async (req, res, next) => {
  const updatedProduct = await service.getProductFromRequest(req)
  updatedProduct.id = await req.params.id

  await productDAO.update(updatedProduct)
}

/**
 * Deletes a product
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
service.delete = async (req, res, next) => {
  const productId = await req.params.id
  await productDAO.delete(productId)
}

/**
 * Gets one product
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
service.get = async (req, res, next) => {
  const productId = await req.params.id
  // const product = await service.getProductFromQueryResult(await productDAO.get(productId))
  const product = await productDAO.get(productId)
  if (product) {
    product.categories = await productDAO.getCategoriesByProductId(product.id)
  }
  // return new Product()
  return product
}

/**
 * Gets all products
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
service.getAll = async (req, res, next) => {
  let products = []

  const queryResult = await productDAO.getAll()

  if (queryResult) {
    products = await service.getProductsFromQueryResult(queryResult)
  }

  return products
}

/**
 * Gets all products from one producer
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
service.getAllFromProducer = async (req, res, next) => {
  let products = []

  const orgNumber = await req.params.orgNumber
  const queryResult = await productDAO.getAllByOrgNumber(orgNumber)

  if (queryResult) {
    products = await service.getProductsFromQueryResult(queryResult)
  }

  return products
}

/**
 * Gets all products from a category
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
service.getAllFromCategory = async (req, res, next) => {
  let products = []

  const categoryId = await req.params.categoryId
  const queryResult = await productDAO.getAllByCategoryId(categoryId)

  if (queryResult) {
    products = await service.getProductsFromQueryResult(queryResult)
  }

  return products
}

service.getAllCategories = async (req, res, next) => {
  const categories = await productDAO.getAllCategories()
  const subcategories = await service.getAllSubCategories()

  categories.forEach(async function (currentCategory) {
    subcategories.forEach(async function (currentSubCategory) {
      if (currentCategory.id === currentSubCategory.parent_id) {
        if (!Object.prototype.hasOwnProperty.call(currentCategory, 'children')) {
          const children = []
          currentCategory.children = children
          currentCategory.children.push(currentSubCategory)
        } else {
          currentCategory.children.push(currentSubCategory)
        }
      }
    })
  })

  categories.forEach(async function (currentCategory) {
    if (Object.prototype.hasOwnProperty.call(currentCategory, 'children')) {
      subcategories.forEach(async function (currentSubCategory) {
        currentCategory.children.forEach(async function (current) {
          if (current.id === currentSubCategory.parent_id) {
            if (!Object.prototype.hasOwnProperty.call(current, 'children')) {
              const children = []
              current.children = children
              current.children.push(currentSubCategory)
            } else {
              current.children.push(currentSubCategory)
            }
          }
        })
      })
    }
  })

  categories.forEach(async function (currentCategory) {
    if (Object.prototype.hasOwnProperty.call(currentCategory, 'children')) {
      subcategories.forEach(async function (currentSubCategory) {
        currentCategory.children.forEach(async function (current) {
          if (Object.prototype.hasOwnProperty.call(current, 'children')) {
            current.children.forEach(async function (current2) {
              if (current2.id === currentSubCategory.parent_id) {
                if (!Object.prototype.hasOwnProperty.call(current2, 'children')) {
                  const children = []
                  current2.children = children
                  current2.children.push(currentSubCategory)
                } else {
                  current2.children.push(currentSubCategory)
                }
              }
            })
          }
        })
      })
    }
  })

  return categories
}

service.getAllSubCategories = async (req, res, next) => {
  const subcategories = await productDAO.getAllSubCategories()
  return subcategories
}

/**
 * Creates and returns a Product object out of the request data
 *
 * @param {*} req
 */
service.getProductFromRequest = async (req) => {
  return new Product(
    req.body.orgNumber,
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.unit,
    req.body.inStock,
    req.body.categories
  )
}

/**
 * Returns a array of Product objects out of the request data
 *
 * @param {*} result
 */
service.getProductsFromQueryResult = async (result) => {
  const products = []

  for await (const object of result) {
    const product = await service.getProductFromQueryResult(await object)
    product.categories = await productDAO.getCategoryIdsByProductId(await product.id)
    products.push(product)
  }
  return products
}

/**
 * Creates and returns a Product object out of the request data
 *
 * @param {*} result
 */
service.getProductFromQueryResult = async (result) => {
  const newProduct = new Product(
    result.producer_org_no,
    result.name,
    result.description,
    result.price,
    result.unit,
    result.in_stock,
    result.categories
  )

  newProduct.id = result.id
  return newProduct
}

module.exports = service
