const service = require('../services/userService')

const controller = {}

controller.test = async (req, res, next) => {
  try {
    //startsidan
  } catch (err) { next(err) }
}

controller.create = async (req, res, text) => {
  service.create(req, res)
}

module.exports = controller
