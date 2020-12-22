const Order = require('../models/order')
const orderDAO = require('../database/orderDAO')

const service = {}

service.get = async (req) => {
  return new Order(1234567897)
}

service.order = async (order) => {
  await orderDAO.order(order)
}

service.getAllOrdersFromProducer = async (orgNumber) => {
  return orderDAO.getAllOrdersFromProducer(orgNumber)
}

service.updateStatus = async (status, id) => {
  await orderDAO.updateStatus(status, id)
}

module.exports = service
