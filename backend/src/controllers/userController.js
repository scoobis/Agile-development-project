const service = require('../services/userService')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')

const controller = {}

// only a testing route for /users/
controller.test = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'You reached /users/' })
  } catch (error) {
    return next(error)
  }
}

controller.create = async (req, res, next) => {
  try {
    if (req.body.role === 'producer') {
      service.createProducer(req)
      res.status(200).json({ success: true, message: 'Account created!' })
    } else {
      service.createCustomer(req)
      res.status(200).json({ success: true, message: 'Account created!' })
    }
  } catch (error) {
    return next(error)
  }
}

controller.login = async (req, res, next) => {
  try {
    const user = await service.login(req.body)
    if (user) {
      const token = jwt.sign({ email: user.email, orgNumber: user.orgNumber, role: user.role }, 'shhhhh', { expiresIn: '1h' })
      res.status(200).json({
        email: user.email,
        name: user.full_name,
        role: user.role,
        orgNumber: user.orgNumber,
        token: token,
        message: 'User found!'
      }
      )
    } else {
      throw createError(400, 'User does not exist!')
    }
  } catch (error) {
    return next(error)
  }
}

module.exports = controller
