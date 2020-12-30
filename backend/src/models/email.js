/**
 * Model representing an Email.
 * @class Email
 */
class Email {
  constructor (sender, recipients, subject, message) {
    this.sender = sender
    this.recipients = recipients
    this.subject = subject
    this.message = message
  }
}

module.exports = Email
