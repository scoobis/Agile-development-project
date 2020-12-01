const service = require('../services/productService')
const createError = require('http-errors')

const controller = {}

controller.create = async (req, res, next) => {
  try {
    service.create(req)
    res.status(200).json({ success: true, message: 'Product added!' })
  } catch (error) {
    return next(error)
  }
}

controller.update = async (req, res, next) => {
  try {
    service.update(req)
    res.status(200).json({ success: true, message: 'Product updated!' })
  } catch (error) {
    return next(error)
  }
}

controller.get = async (req, res, next) => {
  try {
    const result = await service.get(req)
    if (result) {
      res.status(200).json(result)
    } else {
      throw createError(400, 'Product does not exist')
    }
  } catch (error) {
    return next(error)
  }
}

controller.getAll = async (req, res, next) => {
  try {
    const result = await service.getAll()
    res.status(200).json(result)
  } catch (error) {
    return next(error)
  }
}

controller.getAllFromProducer = async (req, res, next) => {
  try {
    const result = await service.getAllFromProducer(req)
    res.status(200).json(result)
  } catch (error) {
    return next(error)
  }
}

module.exports = controller
