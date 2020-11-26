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

service.getAll = async (req, res, next) => {  
  return "Hello, here all products will return."
}

module.exports = service
