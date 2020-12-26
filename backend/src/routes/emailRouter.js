const router = require('express').Router()
const controller = require('../controllers/emailController')
const validate = require('../middlewares/validate')
const authorize = require('../middlewares/authorize')

// TODO Validate the different kind of emails
router.post('/customer', validate.email, controller.sendEmailToProducer)
router.post('/producer', authorize.verifyJWT, controller.sendEmailToCustomers)

module.exports = router
