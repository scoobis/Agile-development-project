const router = require('express').Router()
const controller = require('../controllers/productController')
const validate = require('../middlewares/validate')
const authorize = require('../middlewares/authorize')
const fileUpload = require('../middlewares/fileupload')

router.post('/', fileUpload.product, validate.product, controller.create, fileUpload.errorHandler)
router.get('/:id', controller.get)
router.put('/:id', authorize.ownerOfProduct, controller.update)
router.delete('/:id', authorize.ownerOfProduct, controller.delete)

module.exports = router
