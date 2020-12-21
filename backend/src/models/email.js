/**
 * Model representing an Email.
 * @class Email
 */
class Email {
  constructor (sender, recipient, subject, message) {
    this.sender = sender
    this.recipient = recipient
    this.subject = subject
    this.message = message
  }
}

module.exports = Email
