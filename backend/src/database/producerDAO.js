const createError = require('http-errors')
const Producer = require('../models/producer')
const pool = require('./databaseConnection')

/**
 *  Functions to be exported.
 */
module.exports = {
  list,
  get,
  getSubscribers,
  addSubscriber
}

/**
 * Returns an array or an empty array of producers in the database.
 * @returns {Promise<Producer[]>}
 * @throws {SqlError|Error} - SQL/database problems.
 */
async function list () {
  const list = []
  const query = `
  SELECT u.id, u.email, u.password, u.full_name, u.phone_no, p.org_no, p.description
  FROM producer AS p
  INNER JOIN user AS u
  ON p.user_id=u.id`
  const rows = await pool.query(query)

  rows.forEach(row => list.push(new Producer(
    row.id,
    row.email,
    row.password,
    row.full_name,
    row.phone_no,
    row.org_no,
    row.description
  )))
  return list
}

/**
 * Get a specific producer in the database.
 * @param {number} orgNo - The organization number.
 * @returns {Promise<Producer>} - Promise of a Producer Object.
 * @throws {SqlError|Error} - Producer not found or SQL/database problems.
 */
async function get (orgNo) {
  const query = `
  SELECT u.id, u.email, u.password, u.full_name, u.phone_no, p.org_no, p.description
  FROM producer AS p
  INNER JOIN user AS u
  ON p.user_id=u.id
  WHERE p.org_no=?`
  const queryResult = await pool.query(query, [orgNo])
  if (queryResult.length === 0) {
    throw createError(404, 'Producer not found.')
  }
  const producerRow = queryResult[0]
  return new Producer(
    producerRow.id,
    producerRow.email,
    producerRow.password,
    producerRow.full_name,
    producerRow.phone_no,
    producerRow.org_no,
    producerRow.description
  )
}

/**
 * Returns an array of email addresses that subscribes on the producer's newsletter
 *
 * @param {Number} orgNumber
 * @returns {Promise<String[]>} The email addresses to the subscribers
 */
async function getSubscribers (orgNumber) {
  const selectSubscribers = 'SELECT email FROM subscriber WHERE producer_org_no = ?'
  const result = await pool.query(selectSubscribers, orgNumber)
  if (result.length === 0) {
    throw createError(404, 'No subscribers found.')
  }
  return result.map(row => [row.email])
}

/**
 * Adds a subscriber to the producer's subscriber list
 *
 * @param {Number} orgNumber
 * @param {String} customerEmail
 */
async function addSubscriber (orgNumber, customerEmail) {
  const selectSubscriber = 'SELECT email FROM subscriber WHERE email = ?'
  const insertSubscriber = 'INSERT INTO subscriber value (?, ?)'

  const subscriber = await pool.query(selectSubscriber, customerEmail)

  if (subscriber.length === 0) {
    await pool.query(insertSubscriber, [orgNumber, customerEmail])
  }
}
