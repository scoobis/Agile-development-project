// NOTE: Only example, remove later
const router = require('express').Router()

const controller = require('../controllers/exampleController')

router.get('/', controller.test)

module.exports = router