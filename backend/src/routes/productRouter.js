const router = require('express').Router()
const controller = require('../controllers/productController')
const validate = require('../middlewares/validate')
const authorize = require('../middlewares/authorize')

router.post('/', validate.product, controller.create)
router.get('/:id', authorize.ownerOfProduct, controller.get)
router.put('/:id', authorize.ownerOfProduct, controller.update)
router.delete('/:id', authorize.ownerOfProduct, controller.delete)

module.exports = router
