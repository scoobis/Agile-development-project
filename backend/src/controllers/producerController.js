const service = require('../services/producerService')

const controller = {}
controller.get = async (req, res, next) => {
  try {
    const status = await service.get()
    res.status(200).json({ success: status })
  } catch (error) {
    next(error)
  }
}

module.exports = controller
