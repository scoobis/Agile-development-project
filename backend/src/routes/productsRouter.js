const router = require('express').Router()
const controller = require('../controllers/productController')

router.get('/', controller.getAll)
router.get('/categories', controller.getAllCategories)
router.get('/allFromCategory/:categoryId', controller.getAllFromCategory)
router.get('/:org_no/', controller.getAllFromProducer)

module.exports = router
