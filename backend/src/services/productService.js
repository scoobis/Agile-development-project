const Product = require('../models/product')
const productDAO = require('../database/productDAO')
const userDAO = require('../database/userDAO')

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
  let categories = await productDAO.getAllCategories()
  let subcategories = await service.getAllSubCategories()

  categories.forEach(async function(currentCategory) {
    subcategories.forEach(async function(currentSubCategory) {
      if (currentCategory.id == currentSubCategory.parent_id) {
        if (!currentCategory.hasOwnProperty('children')) {
          let children = []
          currentCategory.children = children
          currentCategory.children.push(currentSubCategory)
        } else {
          currentCategory.children.push(currentSubCategory)
        }
      }
  })
})
  return categories
}

service.getAllSubCategories = async (req, res, next) => {
  let subcategories = await productDAO.getAllSubCategories()
  return subcategories
}

module.exports = service
