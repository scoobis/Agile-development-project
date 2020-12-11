const User = require('./user')

/**
 * Model representing a Producer that extends a User.
 * @class Producer
 */
class Producer extends User {
  constructor (id = null, email, password, name, phone, orgNumber, role = 'producer') {
    super(id, email, password, name)
    this.phone = phone
    this.orgNumber = orgNumber
    this.role = role
  }
}

module.exports = Producer
