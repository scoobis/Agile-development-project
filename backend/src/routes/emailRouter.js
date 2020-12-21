const router = require('express').Router()
const controller = require('../controllers/emailController')

// TODO validate!, Check that email addresses are valid etc.
router.post('/', controller.sendEmail)

module.exports = router
