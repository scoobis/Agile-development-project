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

// Simple get single producer
async function get (orgNo) {
  return await ProducerDAO.get(orgNo)
}
