/**
 * Model representing a User.
 * @class User
 */
class User {
  constructor (id = null, email, password, name, role = 'customer') {
    this.id = id
    this.email = email
    this.password = password
    this.name = name
    this.role = role
  }
}

module.exports = User
