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
    1234567897,  //req.body.orgNumber
    req.body.name,
    req.body.desc,
    req.body.price,
    req.body.unit,
    req.body.inStock
  )
  
  const categoryId = 1 // req.body.categoryId // One or more? Add to product model?

  await productDAO.create(newProduct, categoryId)
}

module.exports = service
