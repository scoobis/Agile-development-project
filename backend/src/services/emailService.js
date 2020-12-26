const mailer = require('../nodemailer/nodemailer')

const service = {}

service.sendEmailToProducer = async (email) => {
  await mailer.sendEmail(email)
}

service.sendEmailToCustomers = async (email) => {
  email.recipient = ['oneEmailAddressHere@blabla.com, anotherEmailAddressHere@blablablab.com']
  await mailer.sendEmail(email)
}

module.exports = service
