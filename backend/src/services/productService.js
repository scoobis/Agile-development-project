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

module.exports = service
