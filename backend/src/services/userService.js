const user = require('../models/user')
const userDAO = require('../database/userDAO')
const createError = require('http-errors')

const service = {}

service.create = async (req, res, next) => {
  
    if (!isValidEmail(req.body.email)) {
      const error = createError(400, 'Not a valid email address!')
      return next(error)
    } else if (!isValidName(req.body.name)) {
      const error = createError(400, 'Name needs to be at least 3 characters long!')
      return next(error)
    } else if (!isValidPassword(req.body.password)) {
      const error = createError(400, 'Password needs to be at least 6 characters long!')
      return next(error)
    } else if (await isAlreadyRegistered(req.body.email)) {
      const error = createError(400, 'Email already exists')
      return next(error)
    } else {
      const userToRegister = new user(
        req.body.email, req.body.password, req.body.name, req.body.role
      )
      await userDAO.create(userToRegister)

      res.status(200).json({ 'success': true, 'message' : 'Account created!'})
    } 
   
}

// Placera funkionerna här under i delad mapp med frontend? Vad sa vi om det?
/**
 * Checks if name is long enough
 * 
 * @param {*} name 
 * @returns {boolean} - True if valid / False if not valid.
 */
const isValidName = (name) => name.length >= 3

/**
 * Checks if password is long enough
 * 
 * @param {*} pwd
 * @returns {boolean} - True if valid / False if not valid.
 */
const isValidPassword = (pwd) => pwd.length >= 6

/**
 * Uses a regex to check if the email is valid.
 *
 * @param {string} email - Email address.
 * @returns {boolean} - True if valid / False if not valid.
 */
const isValidEmail = (email) =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)

/**
 * Checks if the provided email address is already in use.
 * 
 * @param {string} email - Email address.
 * @returns {boolean} - True if already in use/False if not
 */
const isAlreadyRegistered = async (email) => {
  let user = await userDAO.findByEmail(email)
  if (typeof user == 'object') {
    return true
  } else {
    return false
  }
}

module.exports = service
