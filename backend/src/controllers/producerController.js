const service = require('../services/producerService')

module.exports = {
  list,
  get
}

async function list (req, res, next) {
  try {
    const producers = await service.list()
    res.status(200).json(producers)
  } catch (error) {
    next(error)
  }
}

async function get (req, res, next) {
  try {
    const producer = await service.get(req.params.orgno)
    console.dir(producer)
    res.status(200).json(producer)
  } catch (error) {
    next(error)
  }
}
