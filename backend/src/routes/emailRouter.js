const router = require('express').Router()
const controller = require('../controllers/emailController')
const validate = require('../middlewares/validate')
const authorize = require('../middlewares/authorize')

router.post('/customer', validate.email, controller.sendEmailToProducer)
router.post('/producer', authorize.verifyJWT, validate.email, controller.sendEmailToCustomers)

module.exports = router
