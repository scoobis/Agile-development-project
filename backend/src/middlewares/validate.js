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
  const { orgNumber, name, description, price, salePrice, unit, inStock, categories, images } = req.body

  // Check that orgNumber exists
  if (!orgNumber) {
    return next(createError(400, 'The organisation number is "undefined"'))
  }

  if (!name || name.length < 1 || name.length > 20) {
    return next(createError(400, 'The length of the product name must be within the range of 1-20'))
  }

  // No description needed but it should not be undefined
  if (!description) {
    return next(createError(400, 'The description is "undefined"'))
  }

  if (!price || price.length < 1 || price.length > 20) {
    return next(createError(400, 'Try to be more reasonable when setting the price'))
  }

  if (salePrice) {
    if (salePrice.length >= price.length) {
      return next(createError(400, 'The sale price must be lower than the original price'))
    }
  } else {
    // No salePrice needed but it should not be undefined
    return next(createError(400, 'The salePrice is "undefined"'))
  }

  if (!unit || unit.length < 1 || unit.length > 20) {
    return next(createError(400, 'The length of the product name must be within the range of 1-20'))
  }

  if (!inStock || inStock.length < 1 || inStock.length > 9999999) {
    return next(createError(400, 'The number of units in stock must be at least 1 and at most 999999'))
  }

  if (!categories || categories.length < 1) {
    return next(createError(400, 'The product must belong to at least 1 category'))
  }

  // Wait for implementation to see whats needed
  if (!images) {
    return next(createError(400, 'The image array is "undefined"'))
  }

  next()
}

module.exports = validate
