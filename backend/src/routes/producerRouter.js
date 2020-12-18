const router = require('express').Router()
const controller = require('../controllers/producerController')
// const authorize = require('../middlewares/authorize')

// Order
router.get('/', controller.get)

module.exports = router
