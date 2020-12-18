const service = require('../services/producerService')

/**
 * Exported functions in producer controller.
 */
module.exports = {
  list,
  get
}

/**
 * Middleware for listing producers.
 */
async function list (req, res, next) {
  try {
    const producers = await service.list()
    res.status(200).json(producers)
  } catch (error) {
    next(error)
  }
}

/**
 * Middleware for getting a specific producer.
 */
async function get (req, res, next) {
  try {
    const producer = await service.get(req.params.orgno)
    res.status(200).json(producer)
  } catch (error) {
    next(error)
  }
}
