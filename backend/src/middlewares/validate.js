const createError = require('http-errors')
const userService = require('../services/userService')

const validate = {}

validate.user = async (req, res, next) => {
  const { name, email, password } = req.body
  if (!name && !email && !password) {
    const error = createError(400, 'No parameters entered!')
    return next(error)
  }

  const isValidPassword = userService.isValidPassword(password)
  const isValidName = userService.isValidName(name)
  const isValidEmail = userService.isValidEmail(email)
  const isAlreadyRegistered = userService.isAlreadyRegistered(email)

  if (!isValidPassword) {
    const error = createError(400, 'Password needs to be at least 6 characters long!')
    next(error)
  } else if (!isValidName) {
    const error = createError(400, 'Name needs to be at least 3 characters long!')
    next(error)
  } else if (!isValidEmail) {
    const error = createError(400, 'Not a valid email address!')
    next(error)
  } else if (await isAlreadyRegistered) {
    const error = createError(400, 'Email already exists')
    next(error)
  }

  next()
}

validate.producer = async (req, res, next) => {
  if (req.body.role === 'producer') {
    const { orgNumber, phone, zip } = req.body

    const isValidOrganizationNumber = userService.isValidOrganizationNumber(orgNumber)
    const isValidPhoneNumber = userService.isValidPhoneNumber(phone)
    const isValidZipCode = userService.isValidZipCode(zip)
    const isOrgNumberAlreadyInUse = userService.isOrgNumberAlreadyInUse(orgNumber)

    if (!isValidOrganizationNumber) {
      const error = createError(400, 'Not a valid organization number')
      return next(error)
    } else if (!isValidPhoneNumber) {
      const error = createError(400, 'Not a valid phone number')
      return next(error)
    } else if (!isValidZipCode) {
      const error = createError(400, 'Not a valid zip code')
      return next(error)
    } else if (await isOrgNumberAlreadyInUse) {
      const error = createError(400, 'Organization number already exists')
      return next(error)
    }
  }

  next()
}

validate.product = async (req, res, next) => {
  // name (1-20)
  // price (1-20)
  // unit (1-20)
  // inStock (1-9999999)
  // categories (>0)
  console.log('VALIDATION TO BE ADDED?')
  next()
}

module.exports = validate
