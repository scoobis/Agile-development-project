const router = require('express').Router()
const controller = require('../controllers/productController')

// Products
router.get('/', controller.getAll)
router.get('/fromCategory/:categoryId', controller.getAllFromCategory)
router.get('/fromProducer/:orgNumber', controller.getAllFromProducer)
router.get('/search/:name', controller.getAllByName)

// Categories
router.get('/categories', controller.getAllCategories)

module.exports = router
