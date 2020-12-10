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

module.exports = controller
