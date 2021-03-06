const pool = require('./databaseConnection')
const bcrypt = require('bcrypt')

const userDAO = {}

/**
 * Registers a new customer
 *
 * @param {user} user
 */
userDAO.createCustomer = async (user) => {
  let conn
  try {
    conn = await pool.getConnection()
    const password = await bcrypt.hash(user.password, 8)
    await conn.query('INSERT INTO user (email, password, full_name) VALUES (?, ?, ?)', [user.email, password, user.name])
  } finally {
    if (conn) conn.release()
  }
}

/**
 * Registers a new producer
 *
 * @param {producer} user
 */
userDAO.createProducer = async (user, address) => {
  let conn
  try {
    conn = await pool.getConnection()
    const password = await bcrypt.hash(user.password, 8)
    const userResponse = await conn.query('INSERT INTO user (email, password, full_name, phone_no) VALUES (?, ?, ?, ?)', [user.email, password, user.name, user.phone])
    const userId = userResponse.insertId

    const addressResponse = await conn.query('INSERT INTO address (street_address, zip, city) VALUES (?, ?, ?)', [address.streetAddress, address.zip, address.city])
    const addressId = addressResponse.insertId

    await conn.query('INSERT INTO user_address (user_id, address_id, type) VALUES (?, ?, ?)', [userId, addressId, address.type])

    await conn.query('INSERT INTO producer (org_no, user_id) VALUES (?, ?)', [user.orgNumber, userId])
  } finally {
    if (conn) conn.release()
  }
}

/**
 * Finds a user by email
 *
 * @param {string} email
 * @returns {object} user
 */
userDAO.findByEmail = async (email) => {
  let conn
  try {
    conn = await pool.getConnection()
    const [user] = await conn.query('SELECT * FROM user WHERE email=?', [email])
    return user
  } finally {
    if (conn) conn.release()
  }
}

/**
 * Finds producer by organisation number
 *
 * @param {*} orgNumber
 * @returns {object} producer
 */
userDAO.getProducerByOrgNumber = async (orgNumber) => {
  let conn
  try {
    conn = await pool.getConnection()
    const [producer] = await conn.query('SELECT * FROM producer WHERE org_no=?', [orgNumber])
    return producer
  } finally {
    if (conn) conn.release()
  }
}

userDAO.login = async (userToLogIn) => {
  let conn
  try {
    conn = await pool.getConnection()
    const user = await userDAO.findByEmail(userToLogIn.email)

    if (typeof user !== 'undefined') {
      const userFound = await bcrypt.compare(userToLogIn.password, user.password)
      if (userFound) {
        return user
      }
    }
  } finally {
    if (conn) conn.release()
  }
}

/**
 * Returns the role of a user
 *
 * @param {integer} userId
 */
userDAO.getRoleByUserId = async (userId) => {
  let conn
  try {
    conn = await pool.getConnection()
    const [producer] = await conn.query('SELECT * FROM producer WHERE user_id=?', [userId])

    let role = 'customer'

    if (producer) {
      role = 'producer'
    }

    return role
  } finally {
    if (conn) conn.release()
  }
}

/**
 * Gets a producer by user id
 *
 * @param {integer} userId
 */
userDAO.getProducerByUserId = async (userId) => {
  let conn
  try {
    conn = await pool.getConnection()
    const [producer] = await conn.query('SELECT * FROM producer WHERE user_id=?', [userId])
    return producer
  } finally {
    if (conn) conn.release()
  }
}

module.exports = userDAO
