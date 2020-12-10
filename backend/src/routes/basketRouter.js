const router = require('express').Router()
const controller = require('../controllers/basketController')

// Basket
router.post('/', controller.save)
router.get('/:id', controller.get)

module.exports = router
