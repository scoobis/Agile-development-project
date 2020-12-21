const service = require('../services/emailService')
const Email = require('../models/email')

const controller = {}

/**
 * Middleware for sending email
 */
controller.sendEmail = async (req, res, next) => {
  try {
    const mail = parseEmail(req.body)

    await service.sendEmail(mail)

    res.status(200).json({ success: true, message: 'Email sent successfully' })
  } catch (error) {
    return next(error)
  }
}

/**
 * Parses and returns a Mail
 *
 * @param {Object} object
 * @returns {Email} Email
 */
const parseEmail = (object) => {
  return new Email(
    object.sender,
    object.recipient,
    object.subject,
    object.message
  )
}

module.exports = controller
