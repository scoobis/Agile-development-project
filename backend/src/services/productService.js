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
  const newProduct = await service.getProductFromRequest(req)

  const categoryId = 1 // (req.body.categoryId) Tillfälligt hårdkodad för att matcha testkategori i databasen // One or more? Add to product model?

  await productDAO.create(newProduct, categoryId)
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

  const categoryId = 1 // (req.body.categoryId) Tillfälligt hårdkodad för att matcha testkategori i databasen // One or more? Add to product model?

  await productDAO.update(updatedProduct, categoryId)
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
  const product = await productDAO.get(productId)
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
  // Todo: Format them specifically?
  return productDAO.getAll()
}

/**
 * Gets all products from one producer
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
service.getAllFromProducer = async (req, res, next) => {
  const orgNumber = await req.params.org_no
  // Todo: Format them specifically?
  return productDAO.getAllByOrgNumber(orgNumber)
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
    req.body.inStock
  )
}

module.exports = service
