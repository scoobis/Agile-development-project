const User = require('../models/user')
const Producer = require('../models/producer')
const Address = require('../models/address')
const userDAO = require('../database/userDAO')

const service = {}

/**
 * Creates a new customer
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
service.createCustomer = async (req, res, next) => {
  const userToRegister = await service.parseUserFromRequest(req)
  await userDAO.createCustomer(userToRegister)
}

/**
 * Creates a new producer
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
service.createProducer = async (req, res, next) => {
  const userToRegister = await service.parseProducerFromRequest(req)
  const addressToRegister = await service.parseAddressFromRequest(req)
  await userDAO.createProducer(userToRegister, addressToRegister)
}

/**
 * Logs in a user
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} user //TODO Return Producer/User instead?
 */
service.login = async (req, res, next) => {
  const user = await userDAO.login(req)
  if (user) {
    const producer = await userDAO.getProducerByUserId(user.id)
    if (producer) {
      user.role = 'producer'
      user.orgNumber = producer.org_no
    } else {
      user.role = 'customer'
      user.orgNumber = null
    }
  }
  return user
}

/**
 * Returns an orgNumber from an email
 *
 * @param {String} email
 */
service.getOrgNumberByEmail = async (email) => {
  const user = await userDAO.findByEmail(email)
  if (typeof user === 'object') {
    const id = user.id
    const userToReturn = await userDAO.getProducerByUserId(id)
    return userToReturn.org_no
  } else {
    return false
  }
}

/**
 * Parses and returns a User from the request
 *
 * @param {object} req
 * @returns {User} user
 */
service.parseUserFromRequest = async (req) => {
  return new User(
    null,
    req.body.email,
    req.body.password,
    req.body.name,
    'customer'
  )
}

/**
 * Parses and returns a Producer from the request
 *
 * @param {object} req
 * @returns {Producer} producer
 */
service.parseProducerFromRequest = async (req) => {
  return new Producer(
    null,
    req.body.email,
    req.body.password,
    req.body.name,
    req.body.phone,
    req.body.orgNumber,
    null,
    'producer'
  )
}

/**
 * Parses and returns an Address from the request
 *
 * @param {object} req
 * @returns {Address} address
 */
service.parseAddressFromRequest = async (req) => {
  return new Address(
    null,
    req.body.streetAddress,
    req.body.zip,
    req.body.city,
    'business'
  )
}

module.exports = service
