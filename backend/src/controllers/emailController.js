const service = require('../services/emailService')
const Email = require('../models/email')

const controller = {}

/**
 * Middleware for sending email
 */
controller.sendEmailToProducer = async (req, res, next) => {
  try {
    const recipients = Array.of(req.body.recipient)

    const email = parseEmail({ ...req.body, recipients: recipients })

    await service.sendEmailToProducer(email)

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
    const emailOfProducer = req.user.email
    const orgNumber = req.user.orgNumber

    const email = parseEmail({ ...req.body, sender: emailOfProducer, recipients: [] })

    await service.sendEmailToCustomers(email, orgNumber)

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
