const createError = require('http-errors')
const userService = require('../services/validateUserService')
const productService = require('../services/validateProductService')
const emailService = require('../services/validateEmailService')

const validate = {}

validate.user = async (req, res, next) => {
  const { name, email, password } = req.body
  if (!name && !email && !password) {
    const error = createError(400, 'No parameters entered!')
    return next(error)
  }

  if (!name || !email || !password) {
    const error = createError(400, 'Enter all the parameters!')
    return next(error)
  }

  const isValidPassword = userService.isValidPassword(password)
  const isValidName = userService.isValidName(name)
  const isValidEmail = emailService.isValidEmail(email)
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
    const { orgNumber, phone, streetAddress, zip, city } = req.body
    if (!orgNumber || !phone || !streetAddress || !zip || !city) {
      const error = createError(400, 'Enter all the parameters!')
      return next(error)
    }

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

/**
 * Validates a product
 */
validate.product = async (req, res, next) => {
  const { name, description, price, salePrice, unit, inStock, categories, images, tags } = req.body
  const { orgNumber } = req.user

  /**
   * OrgNumber
   */
  if (productService.isUndefined(orgNumber)) {
    return next(createError(400, 'Organisation number is "undefined"'))
  } else {
    if (!(await productService.isValidOrgNumber(orgNumber))) {
      return next(createError(400, 'Producer does not exist'))
    }
  }

  /**
   * Name
   */
  if (productService.isUndefined(name)) {
    return next(createError(400, 'Name is "undefined"'))
  } else {
    if (!productService.isValidName(name)) {
      return next(createError(400, 'The length of the product name must be within the range of 1-20'))
    }
  }

  /**
   * Description
   */
  if (productService.isUndefined(description)) {
    return next(createError(400, 'The description is "undefined"'))
  }

  /**
   * Price
   */
  if (productService.isUndefined(price)) {
    return next(createError(400, 'Price is "undefined"'))
  } else {
    if (!productService.isValidPrice(price)) {
      return next(createError(400, 'Try to be more reasonable when setting the price'))
    }
  }

  /**
   * SalePrice
   */

  if (
    !productService.isUndefined(salePrice) &&
    !productService.isValidSalePrice(parseInt(salePrice), parseInt(price))
  ) {
    return next(createError(400, 'The sale price must be lower than the original price'))
  }

  /**
   * Unit
   */
  if (productService.isUndefined(unit)) {
    return next(createError(400, 'Unit is "undefined"'))
  } else {
    if (!productService.isValidUnit(unit)) {
      return next(createError(400, 'The length of the product unit name must be within the range of 1-20'))
    }
  }

  /**
   * InStock
   */
  if (productService.isUndefined(inStock)) {
    return next(createError(400, 'inStock is "undefined"'))
  } else {
    if (!productService.isValidInStock(inStock)) {
      return next(createError(400, 'The number of units in stock must be at least 0 and at most 999999'))
    }
  }

  /**
   * Categories
   */
  if (productService.isUndefined(categories)) {
    return next(createError(400, 'Categories is "undefined"'))
  } else {
    if (!productService.isArray(categories)) {
      return next(createError(400, 'Categories must be an array'))
    } else if (!productService.isValidCategories(categories)) {
      return next(createError(400, 'The product must belong to at least 1 category'))
    } else if (!(await productService.isValidCategory(categories))) {
      return next(createError(400, 'One of the categories choosen does not exist'))
    }
  }

  // Wait for implementation to see whats needed
  /**
   * Images
   */
  if (!images) {
    // return next(createError(400, 'The image array is "undefined"'))
  }

  /**
   * Tags
   */
  if (!productService.isUndefined(tags) && !productService.isArray(tags)) {
    return next(createError(400, 'Tags is "undefined"'))
  }

  next()
}

/**
 * Validates an email
 */
validate.email = async (req, res, next) => {
  const { sender, recipient, subject, message } = req.body

  if (!sender || !recipient || !subject || !message) {
    const error = createError(400, 'Enter all the parameters!')
    return next(error)
  }

  /**
   * Sender
   */
  if (!emailService.isValidEmail(sender)) {
    return next(createError(400, 'The email address of the sender is invalid'))
  }

  /**
   * to
   */
  if (!emailService.isValidEmail(recipient)) {
    return next(createError(400, 'The email address of the recipient is invalid'))
  }

  next()
}

module.exports = validate
