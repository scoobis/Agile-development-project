class user {
  constructor (email, password, name) {
    this.email = email
    this.password = password
    this.name = name
    this._role = 'customer'
  }

  get role () {
    return this._role
  }

  /**
   * @param {any} id
   */
  set id (id) {
    this._id = id
  }

  get id () {
    return this._id
  }

  /**
   * @param {string} email
   */
  set email (email) {
    this._email = email
  }

  get email () {
    return this._email
  }

  /**
   * @param {string} password
   */
  set password (password) {
    this._password = password
  }

  get password () {
    return this._password
  }

  /**
   * @param {string} name
   */
  set name (name) {
    this._name = name
  }

  get name () {
    return this._name
  }

  /**
   * @param {*} phone
   */
  set phone (phone) {
    this._phone = phone
  }

  get phone () {
    return this._phone
  }

  /**
   * @param {string} orgNumber
   */
  set orgNumber (orgNumber) {
    this._orgNumber = orgNumber
  }

  get orgNumber () {
    return this._orgNumber
  }
}

module.exports = user
