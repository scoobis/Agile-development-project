const user = require('../models/user')
const address = require('../models/address')
const userDAO = require('../database/userDAO')

const service = {}

/**
 * Creates a new user
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
service.create = async (req, res, next) => {  
  const userToRegister = new user(
    req.body.email, req.body.password, req.body.name, req.body.role
  )

  if (req.body.role === 'producer') { // Enum?
    const addressToRegister = new address(
      req.body.streetAddress, req.body.zip, req.body.city, 'business' // Enum?
    )
    userToRegister.businessAddress = addressToRegister
    userToRegister.orgNumber = req.body.orgNumber
  }
  
  await userDAO.create(userToRegister)

}

// Placera funkionerna här under i delad mapp med frontend? Vad sa vi om det?
/**
 * Checks if name is long enough
 * 
 * @param {*} name 
 * @returns {boolean} - True if valid / False if not valid.
 */
service.isValidName = (name) => name.length >= 3

/**
 * Checks if password is long enough
 * 
 * @param {*} pwd
 * @returns {boolean} - True if valid / False if not valid.
 */
service.isValidPassword = (pwd) => pwd.length >= 6

/**
 * Uses a regex to check if the email is valid.
 *
 * @param {string} email - Email address.
 * @returns {boolean} - True if valid / False if not valid.
 */
service.isValidEmail = (email) =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)

/**
 * Checks if the provided email address is already in use.
 * 
 * @param {string} email - Email address.
 * @returns {boolean} - True if already in use/False if not
 */
service.isAlreadyRegistered = async (email) => {
  let user = await userDAO.findByEmail(email)
  if (typeof user == 'object') {
    return true
  } else {
    return false
  }
}

/**
 * Checks if organization number is valid 
 * 
 * @param {*} num 
 */
service.isValidOrganizationNumber = (num) => {
  let n = num

  if (typeof num === 'string') {
    n = num.replace(/\D/g, '')
  }

  return n.length === 10
}

/**
 * Checks if zip code is valid
 * 
 * @param {*} code 
 */
service.isValidZipCode = (code) => code.length === 5

/**
 * Checks if phone number is valid
 * 
 * @param {*} number 
 */
service.isValidPhoneNumber = number => number.length === 10

/**
 * Checks if the provided organisation number is already in use.
 * 
 * @param {*} orgNumber - Email address.
 * @returns {boolean} - True if already in use/False if not
 */
service.isOrgNumberAlreadyInUse = async (orgNumber) => {
  let producer = await userDAO.findProducerByOrgNumber(orgNumber)
  if (typeof producer == 'object') {
    return true
  } else {
    return false
  }
}

module.exports = service
