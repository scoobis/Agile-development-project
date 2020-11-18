
const service = require('../services/registerService')

const controller = {}


controller.test = async (req, res, next) => {
  try {
    //startsidan
  } catch (err) { next(err) }
}

controller.registerUser = async (req, res, text) => {
  service.registerUser(req)
  res.sendStatus(200);
}

module.exports = controller