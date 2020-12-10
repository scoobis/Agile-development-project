const service = require('../services/orderService')
const createError = require('http-errors')

const controller = {}

controller.get = async (req, res, next) => {
  try {
    const order = await service.get(req)
    if (order) {
      res.status(200).json(order)
    } else {
      throw createError(400, 'Order does not exist')
    }
  } catch (error) {
    return next(error)
  }
}

module.exports = controller
