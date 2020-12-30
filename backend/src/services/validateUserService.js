const userDAO = require('../database/userDAO')

const service = {}

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
 * Checks if the provided email address is already in use.
 *
 * @param {string} email - Email address.
 * @returns {boolean} - True if already in use/False if not
 */
service.isAlreadyRegistered = async (email) => {
  const user = await userDAO.findByEmail(email)
  if (typeof user === 'object') {
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
  const producer = await userDAO.getProducerByOrgNumber(orgNumber)
  if (typeof producer === 'object') {
    return true
  } else {
    return false
  }
}

module.exports = service
