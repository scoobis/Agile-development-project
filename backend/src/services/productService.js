const productDAO = require('../database/productDAO')
const fs = require('fs')

const service = {}

/**
 * Creates a new product
 *
 * @param {Product} product
 * @param {Object[]} files
 */
service.create = async (product, files) => {
  try {
    await productDAO.create(product, files)
  } catch (error) {
    // Try deleting the newly uploaded files.
    // Maybe not save them at all if not need be?
    // TODO: shouldn't have to check if req.files exist, needs to use models to pre-exist.
    // But keep it here for now.
    if (files) {
      files.forEach(file => fs.unlinkSync(file.path))
    }
    throw error
  }
}

/**
 * Updates a product
 *
 * @param {Product} product
 */
service.update = async (product) => {
  try {
    await productDAO.get(product.id)
    await productDAO.update(product)
  } catch (error) {
    if (product.images) {
      product.images.forEach(file => fs.unlinkSync(file.path))
    }
    throw error
  }
}

/**
 * Deletes a product
 *
 * @param {Number} id - The id of the product
 */
service.delete = async (id) => {
  const images = await productDAO.getImages(id)

  await productDAO.delete(id)

  images.forEach(image => fs.unlinkSync('uploads/' + image.imageName))
}

/**
 * Returns one product
 *
 * @param {Number} id - The id of the product
 * @returns {Promise<Product>} product
 */
service.get = async (id) => {
  return productDAO.get(id)
}

/**
 * Returns all products
 *
 * @returns {Promise<Product[]>}
 */
service.getAll = async () => {
  return productDAO.getAll()
}

/**
 * Returns all products from one producer
 *
 * @param {Number} orgNumber
 * @returns {Promise<Product[]>}
 */
service.getAllFromProducer = async (orgNumber) => {
  return productDAO.getAllByOrgNumber(orgNumber)
}

/**
 * Returns all products from a category
 *
 * @param {Number} categoryId
 * @returns {Object{String, Product[]}} { name: categoryName, products: [] }
 */
service.getAllFromCategory = async (categoryId) => {
  const category = await productDAO.getCategoryById(categoryId)
  const products = await productDAO.getAllByCategoryId(category.id)

  return { name: category.name, products: products }
}

/**
 * Returns a category from its id
 *
 * @param {Number} categoryId
 * @returns {Promise<Category>}
 */
service.getCategory = async (categoryId) => {
  return productDAO.getCategoryById(categoryId)
}

/**
 * Returns all products that has a name, category name or tag name that match the name provided
 *
 * @param {String} name
 * @returns {Promise<Product[]>}
 */
service.getAllByName = async (name) => {
  return productDAO.getAllByName(name)
}

/**
 * Returns all categories
 */
service.getAllCategories = async () => {
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

/**
 * Returns all sub categories
 */
service.getAllSubCategories = async () => {
  const subcategories = await productDAO.getAllSubCategories()
  return subcategories
}

module.exports = service
