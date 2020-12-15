const router = require('express').Router()
const controller = require('../controllers/orderController')

// Order
router.get('/:id', controller.get)
router.post('/', controller.sendorder)

module.exports = router
