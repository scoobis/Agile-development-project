// NOTE: Only example, remove later
const router = require('express').Router()

const controller = require('../controllers/registerController')

router.get('/', controller.test)
router.post('/users', controller.registerUser)

module.exports = router