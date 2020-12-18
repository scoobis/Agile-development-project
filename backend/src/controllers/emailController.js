const service = require('../services/emailService')
const Email = require('../models/email')

const controller = {}

controller.sendEmail = async (req, res, next) => {
  try {
    console.log(req.body)
    const mail = parseEmail(req.body)

    const result = await service.sendEmail(mail).catch(error => { res.status(400).json({ success: false, message: error }) })

    if (result) {
      res.status(200).json({ success: true, message: 'Email sent successfully' })
    } else {
      res.status(400).json({ success: false, message: 'Try again!' })
    }
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
    object.from,
    object.to,
    object.subject,
    object.message
  )
}

module.exports = controller
