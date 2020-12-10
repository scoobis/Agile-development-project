const createError = require('http-errors')
const service = require('../services/basketService')

const controller = {}

controller.save = async (req, res, next) => {
  try {
    const result = await service.save(req)
    if (result) {
      res.status(200).json({ success: true, message: 'Basket updated!' })
    } else {
      throw createError(400, 'FAILED')
    }
  } catch (error) {
    return next(error)
  }
}

controller.get = async (req, res, next) => {
  try {
    const basket = await service.get(req)
    if (basket) {
      res.status(200).json(basket)
    } else {
      throw createError(400, 'Basket does not exist')
    }
  } catch (error) {
    return next(error)
  }
}

module.exports = controller
