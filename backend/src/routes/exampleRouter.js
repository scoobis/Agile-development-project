// NOTE: Only example, remove later
const router = require('express').Router()

const controller = require('../controllers/exampleController')

router.get('/', controller.test)
router.post('/users', controller.registerUser)

module.exports = router