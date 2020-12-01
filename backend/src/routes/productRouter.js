const router = require('express').Router()
const controller = require('../controllers/productController')
const validate = require('../middlewares/validate')
const authorize = require('../middlewares/authorize')

router.post('/', validate.product, controller.create)
router.get('/:id', controller.get)
router.put('/:id', authorize.ownerOfProduct, controller.update)

module.exports = router
