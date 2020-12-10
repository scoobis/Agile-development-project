const router = require('express').Router()
const controller = require('../controllers/basketController')

// Basket
router.post('/', controller.save)

module.exports = router
