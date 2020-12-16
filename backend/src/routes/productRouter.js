const router = require('express').Router()
const controller = require('../controllers/productController')
const validate = require('../middlewares/validate')
const authorize = require('../middlewares/authorize')
const fileUpload = require('../middlewares/fileupload')

// Categories
router.get('/categories', controller.getAllCategories)

// Products
router.get('/all', controller.getAll)
router.get('/category/:categoryId', controller.getAllFromCategory)
router.get('/producer/:orgNumber', controller.getAllFromProducer)
router.get('/all/search?', controller.getAllByName)

// Product
router.post('/', authorize.verifyJWT, fileUpload.product, validate.product, controller.create, fileUpload.errorHandler)
router.get('/:id', controller.get)
router.put('/:id', authorize.verifyJWT, fileUpload.product, validate.product, controller.update, fileUpload.errorHandler)
router.delete('/:id', authorize.verifyJWT, controller.delete)

module.exports = router
