const user = require('../models/user')
const userDAO = require('../database/userDAO')

const service = {}

service.create = async (req, res, next) => {

      const userToRegister = new user(
        req.body.email, req.body.password, req.body.name, req.body.role
      )
      await userDAO.create(userToRegister)
}

service.login = async (req, res, next) => {
  let user = await userDAO.login(req)
  return user
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

module.exports = service
