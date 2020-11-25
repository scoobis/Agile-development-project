const user = require("./user")

class producer extends user {
  constructor(email, password, name, phone, orgNumber) {
    super(email, password, name)
    this.phone = phone
    this.orgNumber = orgNumber
    this._role = 'producer'
  }

  /**
   * @param {string} orgNumber
   */
  set orgNumber(orgNumber) {
    this._orgNumber = orgNumber
  }
  get orgNumber() {
    return this._orgNumber
  }
  
}

module.exports = producer
