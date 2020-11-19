const user = require('../models/user')
const userDAO = require('../database/userDAO')

const service = {}

service.create = async (req, res) => {
  try {
    if (!isValidEmail(req.body.email)) {
      throw new Error('Not a valid email address!')
    } else if (!isValidName(req.body.name)) {
      throw new Error('Name needs to be at least 3 characters long!')
    } else if (!isValidPassword(req.body.password)) {
      throw new Error('Password needs to be at least 6 characters long!')
    } else if (await isAlreadyRegistered(req.body.email)) {
      throw new Error('Email already exists')
    } else {
      const userToRegister = new user(
        req.body.email, req.body.password, req.body.name, req.body.role
      )
      await userDAO.create(userToRegister)
      //SKA ANVÄNDAs NÄR DET ÄR IMPLEMENTERAT PÅ FRONTEND
      //res.status(200).json({ 'success': true, 'message' : 'Account created!'})
    }
  } catch (error) {
    //SKA ANVÄNDAs NÄR DET ÄR IMPLEMENTERAT PÅ FRONTEND
    //res.status(400).json({ 'error': true, 'message' : error.message})  
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
