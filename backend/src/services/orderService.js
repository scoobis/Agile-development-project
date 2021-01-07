const Order = require('../models/order')
const orderDAO = require('../database/orderDAO')
const producerDAO = require('../database/producerDAO')
const mailer = require('../nodemailer/nodemailer')
const Email = require('../models/email')

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

service.updateStatus = async (status, id, producerEmail) => {
  await orderDAO.updateStatus(status, id)

  const customerEmail = await orderDAO.getCustomerEmail(id)

  if (customerEmail) {
    const email = new Email(
      producerEmail,
      customerEmail,
      'Updaterad orderstatus',
      `Orderstatusen på orderid ${id} är nu ${status}`
    )

    mailer.sendEmail(email)
  }
}

module.exports = service
