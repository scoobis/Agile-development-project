const router = require('express').Router()
const controller = require('../controllers/producerController')

// Producer
router.get('/', controller.get)

module.exports = router
