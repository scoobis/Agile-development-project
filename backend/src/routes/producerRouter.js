const router = require('express').Router()
const controller = require('../controllers/producerController')

// Producer
router.get('/', controller.list)
router.get('/:orgno', controller.get)

module.exports = router
