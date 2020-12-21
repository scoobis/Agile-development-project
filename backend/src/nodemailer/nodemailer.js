const nodemailer = require('nodemailer')
const createError = require('http-errors')

const mailer = {}

/**
 * Sends an email
 *
 * @param {Email} email
 * @throws {HttpError} - HttpError
 */
mailer.sendEmail = async (email) => {
  await emailHandler(email)
    .catch(error => {
      throw createError(error.responseCode, error.response)
    })
}

/**
 * Handles email sending
 *
 * @param {Email} email
 * @returns {Object} result
 * @throws {Error} error
 */
const emailHandler = async (email) => {
  const { from, to, subject, message } = email

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: '2dv612team2@gmail.com',
      pass: 'EkoRingenArDetBastaSomFinns321' // TODO set as ENV_VAR
    }
  })

  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: message
  }

  return transporter.sendMail(mailOptions)
}

module.exports = mailer
