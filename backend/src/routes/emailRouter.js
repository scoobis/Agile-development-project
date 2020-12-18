const router = require('express').Router()
const controller = require('../controllers/emailController')

router.post('/', controller.sendEmail)

module.exports = router
