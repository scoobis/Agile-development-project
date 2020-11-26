const product = require("../models/product")
const service = require('../services/productService')

const controller = {}

controller.create = async (req, res, next) => {
  try {
    service.create(req)
    res.status(200).json({ 'success': true, 'message' : 'Product added!'})
  } catch (error) {
    return next(error)
  } 
}

module.exports = controller
