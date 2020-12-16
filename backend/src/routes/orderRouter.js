const router = require('express').Router()
const controller = require('../controllers/orderController')
const authorize = require('../middlewares/authorize')

// Order
router.get('/:id', controller.get)
router.get('/producer/orders', authorize.verifyJWT, controller.getAllOrdersFromProducer)
router.post('/', controller.sendorder)

module.exports = router
