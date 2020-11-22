const service = require('../services/userService')

const controller = {}

controller.test = async (req, res, next) => {
  try {
    //startsidan
  } catch (err) { next(err) }
}

controller.create = async (req, res, next) => {
  service.create(req, res, next)
}

module.exports = controller
