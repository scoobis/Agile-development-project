const service = require('../services/productService')
const createError = require('http-errors')

const controller = {}

controller.create = async (req, res, next) => {
  try {
    await service.create(req)
    res.status(200).json({ success: true, message: 'Product added!' })
  } catch (error) {
    console.error(error)
    // TODO: Fix better than 500?
    return next(createError(500))
  }
}

controller.update = async (req, res, next) => {
  try {
    await service.update(req)
    res.status(200).json({ success: true, message: 'Product updated!' })
  } catch (error) {
    console.error(error)
    // TODO: Fix better than 500?
    return next(createError(500))
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
    console.error(error)
    // TODO: Fix better than 500?
    return next(createError(500))
  }
}

controller.getAll = async (req, res, next) => {
  try {
    const result = await service.getAll()
    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    // TODO: Fix better than 500?
    return next(createError(500))
  }
}

controller.getAllFromProducer = async (req, res, next) => {
  try {
    const result = await service.getAllFromProducer(req)
    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    // TODO: Fix better than 500?
    return next(createError(500))
  }
}


controller.getAllCategories = async (req, res, next) => {
  try {
    const result = await service.getAllCategories()
    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    // TODO: Fix better than 500?
    return next(createError(500))
  }
}

controller.delete = async (req, res, next) => {
  try {
    service.delete(req)
    res.status(200).json({ success: true, message: 'Product deleted!' })
  } catch (error) {
    console.error(error)
    // TODO: Fix better than 500?
    return next(createError(500))
  }
}

module.exports = controller
