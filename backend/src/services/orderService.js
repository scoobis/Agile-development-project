const Order = require('../models/order')

const service = {}

service.get = async (req) => {
  return new Order(1234567897)
}

module.exports = service
