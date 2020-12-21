const router = require('express').Router()
const controller = require('../controllers/emailController')
const validate = require('../middlewares/validate')

router.post('/', validate.email, controller.sendEmail)

module.exports = router
