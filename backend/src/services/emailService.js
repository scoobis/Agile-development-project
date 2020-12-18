const mailer = require('../nodemailer/nodemailer')

const service = {}

service.sendEmail = async (email) => {
  return mailer.sendEmail(email)
}

module.exports = service
