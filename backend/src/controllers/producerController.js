const service = require('../services/producerService')
const createError = require('http-errors')

const controller = {}
controller.get = async (req, res, next) => {
  res.status(200)
}

module.exports = controller
