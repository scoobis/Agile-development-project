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
 * @param {Number} orgNumber
 */
service.sendEmailToCustomers = async (email, orgNumber) => {
  email.recipients = await producerDAO.getSubscribers(orgNumber)
  await mailer.sendEmail(email)
}

module.exports = service
