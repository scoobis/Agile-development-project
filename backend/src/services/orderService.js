const Order = require('../models/order')

const service = {}

service.getProducts = async (req) => {
  return new Order(1, 1)
}

module.exports = service
