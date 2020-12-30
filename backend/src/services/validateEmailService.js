const service = {}

/**
 * Uses a regex to check if the email is valid.
 *
 * @param {string} email - Email address.
 * @returns {boolean} - True if valid / False if not valid.
 */
service.isValidEmail = (email) =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)

/**
 * Validates the subject
 *
 * @param {String} subject
 * @returns {boolean} - True if valid / False if not valid.
 */
service.isValidSubject = (subject) => subject.length >= 3

/**
 * Validates the message
 *
 * @param {String} message
 * @returns {boolean} - True if valid / False if not valid.
 */
service.isValidMessage = (message) => message.length >= 10

module.exports = service
