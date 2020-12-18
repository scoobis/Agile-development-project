const Producer = require('../models/producer')
const ProducerDAO = require('../database/producerDAO')
// Exported Producer Service Object
module.exports = {
  getAll
}

// Simple get all producers in an array.
async function getAll () {
  const resultArr = await ProducerDAO.getAll()
  return [new Producer(1, 'producenten@mail.com', 'testpassword', 'testnamn', '0123456789', '123456789', 'TestDescription', 'producer'), ...resultArr]
}
