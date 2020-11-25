const createError = require('http-errors')
const service = require('../services/userService')

const validate = {}

validate.user = async (req, res, next) => {
  const { name, email, password } = req.body
  if (!name && !email && !password) {
    const error = createError(400, 'No parameters entered!')
    return next(error)
  }

  const isValidPassword = service.isValidPassword(password)
  const isValidName = service.isValidName(name)
  const isValidEmail = service.isValidEmail(email)
  const isAlreadyRegistered = service.isAlreadyRegistered(email)

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
  if (req.body.role === 'producer') { //If statement could be removed if verified from other place

    const { orgNumber, phone, zip } = req.body

    const isValidOrganizationNumber = service.isValidOrganizationNumber(orgNumber)
    const isValidPhoneNumber = service.isValidPhoneNumber(phone)
    const isValidZipCode = service.isValidZipCode(zip)
    const isOrgNumberAlreadyInUse = service.isOrgNumberAlreadyInUse(orgNumber)

    if (!isValidOrganizationNumber) {
      const error = createError(400, 'Not a valid organization number')
      return next(error)
    } else if (!isValidPhoneNumber){
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

module.exports = validate
