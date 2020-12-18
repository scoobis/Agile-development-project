const createError = require('http-errors')
const Producer = require('../models/producer')
const pool = require('./databaseConnection')

/**
 *  Functions to be exported.
 */
module.exports = {
  list,
  get
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
  const row = await pool.query(query, [orgNo])
  if (row.length === 0) {
    throw createError(404, 'Producer not found.')
  }
  return new Producer(
    row.id,
    row.email,
    row.password,
    row.full_name,
    row.phone_no,
    row.org_no,
    row.description
  )
}
