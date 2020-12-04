const router = require('express').Router()
const controller = require('../controllers/productController')
const validate = require('../middlewares/validate')
const authorize = require('../middlewares/authorize')

// Fix better in some way?
const multer = require('multer')
const uploadProduct = multer({ dest: 'uploads/' })

router.post('/', validate.product, uploadProduct.any(), controller.create)
router.get('/:id', authorize.ownerOfProduct, controller.get)
router.put('/:id', authorize.ownerOfProduct, controller.update)
router.delete('/:id', authorize.ownerOfProduct, controller.delete)

module.exports = router
