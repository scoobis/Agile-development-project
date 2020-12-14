const Order = require('../models/order')
const orderDAO = require('../database/orderDAO')

const service = {}

service.get = async (req) => {
  return new Order(1234567897)
}

service.order = async (order) => {
  orderDAO.order(order)
}

module.exports = service
