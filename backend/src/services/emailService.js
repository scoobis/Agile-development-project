const mailer = require('../nodemailer/nodemailer')
const producerDAO = require('../database/producerDAO')

const service = {}

/**
 * Sends an email to the producer
 *
 * @param {Email} email
 */
service.sendEmailToProducer = async (email) => {
  await mailer.sendEmail(email)
}

/**
 * Sends an email to the customers of the producer
 *
 * @param {Email} email
 */
service.sendEmailToCustomers = async (email) => {
  email.recipients = await producerDAO.getSubscribers(1111111111)
  await mailer.sendEmail(email)
}

module.exports = service
