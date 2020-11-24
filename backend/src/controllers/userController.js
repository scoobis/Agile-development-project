const service = require('../services/userService')
const createError = require('http-errors')

const controller = {}

controller.test = async (req, res, next) => {
  try {
    //startsidan
  } catch (err) { next(err) }
}

controller.create = async (req, res, next) => {
  console.log(req.body)
  const { name, email, password, role, orgNumber, zip } = req.body

  const phone = '0707070707' // Temporary

  if (!name && !email && !password) {
    const error = createError(400, 'No parameters entered!')
    return next(error)
  }

  const isValidPassword = service.isValidPassword(password)
  const isValidName = service.isValidName(name)
  const isValidEmail = service.isValidEmail(email)
  const isAlreadyRegistered = service.isAlreadyRegistered(email)
  const isValidOrganizationNumber = service.isValidOrganizationNumber(orgNumber)
  const isValidPhoneNumber = service.isValidPhoneNumber(phone)
  const isValidZipCode = service.isValidZipCode(zip)
  const isOrgNumberAlreadyInUse = service.isOrgNumberAlreadyInUse(orgNumber)

  // User
  if (!isValidPassword) {
    const error = createError(400, 'Password needs to be at least 6 characters long!')
    return next(error)
  } else if (!isValidName) {
    const error = createError(400, 'Name needs to be at least 3 characters long!')
    return next(error)
  } else if (!isValidEmail) {
    const error = createError(400, 'Not a valid email address!')
    return next(error)
  } else if (await isAlreadyRegistered) {
    const error = createError(400, 'Email already exists')
    return next(error)
  } 
  
  // Producer
  if (role === 'producer') { //Create function/enum?
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

  try {
    service.create(req)
    res.status(200).json({ 'success': true, 'message' : 'Account created!'})
  } catch (error) {
    return next(error)
  }
  
}

module.exports = controller
