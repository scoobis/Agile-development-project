const router = require('express').Router()

const controller = require('../controllers/userController')

router.get('/', controller.test)
router.post('/users', controller.create)

module.exports = router