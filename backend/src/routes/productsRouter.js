const router = require('express').Router()
const controller = require('../controllers/productController')
// const validate = require('../middlewares/validate')

router.get('/', controller.getAll)

module.exports = router
