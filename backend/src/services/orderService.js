const Order = require('../models/order')
const orderDAO = require('../database/orderDAO')
const producerDAO = require('../database/producerDAO')

const service = {}

service.get = async (req) => {
  return new Order(1234567897)
}

service.order = async (order, subscribe) => {
  if (subscribe) {
    await producerDAO.addSubscriber(order.orgNumber, order.customerEmail)
  }
  await orderDAO.order(order)
}

service.getAllOrdersFromProducer = async (orgNumber) => {
  return orderDAO.getAllOrdersFromProducer(orgNumber)
}

service.updateStatus = async (status, id) => {
  await orderDAO.updateStatus(status, id)
}

module.exports = service
