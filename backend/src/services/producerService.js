const ProducerDAO = require('../database/producerDAO')

// Exported Producer Service Object
module.exports = {
  list,
  get
}

// Simple get all producers in an array.
async function list () {
  return await ProducerDAO.list()
}

/**
 * Get a Producer from organization number.
 *
 * @param {number} orgNo - The organization number.
 * @returns {Promise<Producer>}
 * @throws {SqlError|Error}
 */
async function get (orgNo) {
  return await ProducerDAO.get(orgNo)
}
