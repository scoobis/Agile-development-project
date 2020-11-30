const router = require('express').Router()
const controller = require('../controllers/productController')
const validate = require('../middlewares/validate')

router.post('/', validate.product, controller.create)
router.get('/:id', controller.get)

module.exports = router
