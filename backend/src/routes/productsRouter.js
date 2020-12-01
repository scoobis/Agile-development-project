const router = require('express').Router()
const controller = require('../controllers/productController')
// const validate = require('../middlewares/validate')

router.get('/', controller.getAll)
router.get('/categories', controller.getAllCategories)
router.get('/:org_no/', controller.getAllFromProducer)


module.exports = router
