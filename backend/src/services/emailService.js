const mailer = require('../nodemailer/nodemailer')

const service = {}

service.sendEmail = async (email) => {
  await mailer.sendEmail(email)
}

module.exports = service
