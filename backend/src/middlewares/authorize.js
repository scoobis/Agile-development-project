const jwt = require('jsonwebtoken')
const service = require('../services/userService')
const createError = require('http-errors')
const authorize = {}

authorize.ownerOfProduct = async (req, res, next) => {
  const orgNumberOfProduct = req.body.orgNumber
  const token = req.headers.authorization

  try {
    const loggedInUser = jwt.verify(token, 'shhhhh')
    const email = loggedInUser.email
    const loggedInUserOrgNumber = await service.getOrgNumberByEmail(email)

    if (loggedInUserOrgNumber !== orgNumberOfProduct) {
      const error = createError(403, 'Du kan för fan inte ändra andras produkter!')
      return next(error)
    }
    next()
  } catch (error) {
    const err = createError(401, error.name)
    return next(err)
  }
}

module.exports = authorize
