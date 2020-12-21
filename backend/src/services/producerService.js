const ProducerDAO = require('../database/producerDAO')

/**
  * Functions to be exported in Producer Service Object.
  */
module.exports = {
  list,
  get
}

/**
 * Get an array of registered producers or empty array.
 * @returns {Promise<Producer[]>} - Promise of an array of Producer Objects.
 * @throws {SqlError|Error} - SQL/Data problems.
 */
async function list () {
  return await ProducerDAO.list()
}

/**
 * Get a Producer from an organization number.
 * @param {number} orgNo - The organization number.
 * @returns {Promise<Producer>} - Promise of a Producer Object.
 * @throws {SqlError|Error} - SQL/Data problems.
 */
async function get (orgNo) {
  const res = await ProducerDAO.get(orgNo)
  return res
}
