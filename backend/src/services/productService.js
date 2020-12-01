const Product = require('../models/product')
const productDAO = require('../database/productDAO')

const service = {}

/**
 * Creates a new product
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
service.create = async (req, res, next) => {
  const newProduct = new Product(
    req.body.orgNumber,
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.unit,
    req.body.inStock
  )

  const categoryId = 1 // (req.body.categoryId) Tillfälligt hårdkodad för att matcha testkategori i databasen // One or more? Add to product model?

  await productDAO.create(newProduct, categoryId)
}

service.get = async (req, res, next) => {
  const productId = await req.params.id
  const product = await productDAO.get(productId)
  return product
}

service.getAll = async (req, res, next) => {
  // Todo: Format them specifically?
  return productDAO.getAll()
}

service.getAllFromProducer = async (req, res, next) => {
  const orgNumber = await req.params.org_no
  // Todo: Format them specifically?
  return productDAO.getAllByOrgNumber(orgNumber)
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

module.exports = service
