const nodemailer = require('nodemailer')

const mailer = {}

mailer.sendEmail = async (email) => {
  const { from, to, subject, message } = email

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: '2dv612team2@gmail.com',
      pass: 'The PAsswordn!' // TODO set as ENV_VAR
    }
  })

  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: message
  }

  const result = await transporter.sendMail(mailOptions)

  return result
}

module.exports = mailer
