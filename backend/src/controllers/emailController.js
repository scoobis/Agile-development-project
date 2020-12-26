const service = require('../services/emailService')
const Email = require('../models/email')

const controller = {}

/**
 * Middleware for sending email
 */
controller.sendEmailToProducer = async (req, res, next) => {
  try {
    // TODO Make recipients an array instead of single string
    const mail = parseEmail(req.body)

    await service.sendEmailToProducer(mail)

    res.status(200).json({ success: true, message: 'Email sent successfully' })
  } catch (error) {
    return next(error)
  }
}

/**
 * Middleware for sending email
 */
controller.sendEmailToCustomers = async (req, res, next) => {
  try {
    const mail = parseEmail({ ...req.body, sender: req.user.email, recipients: [] })

    await service.sendEmailToCustomers(mail)

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
    object.recipients,
    object.subject,
    object.message
  )
}

module.exports = controller
