const product = require('../models/product')
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
  const newProduct = new product(
    1234567897,  //(req.body.orgNumber)  Tillfälligt hårdkodad för att matcha testproducent i databasen
    req.body.name,
    req.body.desc,
    req.body.price,
    req.body.unit,
    req.body.inStock
  )
  
  const categoryId = 1 // (req.body.categoryId) Tillfälligt hårdkodad för att matcha testkategori i databasen // One or more? Add to product model?

  await productDAO.create(newProduct, categoryId)
}

service.get = async (req, res, next) => {
  const productId = await req.params.id
  return await productDAO.get(productId)
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
