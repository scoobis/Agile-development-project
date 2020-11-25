const router = require('express').Router()
const controller = require('../controllers/userController')
const validate = require('../middlewares/validate')

//router.get('/', controller.test)
router.post('/register', validate.user, validate.producer, controller.create)
router.post('/login', controller.login)

module.exports = router
