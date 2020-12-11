const router = require('express').Router()
const controller = require('../controllers/orderController')

// Order
router.get('/:id', controller.get)

module.exports = router
