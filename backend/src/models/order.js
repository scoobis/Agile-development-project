/**
 * Model representing a Order.
 * @class Order
 */
module.exports = class Order {
  constructor (orgNumber, customerName = null, customerPhone = null, customerStreetAddress = null, customerZip = null, customerCity = null, price = 0, created = 2020, id = null) {
    this.orgNumber = orgNumber
    this.customerName = customerName
    this.customerPhone = customerPhone
    this.customerStreetAddress = customerStreetAddress
    this.customerZip = customerZip
    this.customerCity = customerCity
    this.price = price
    this.created = created
    this.id = id
  }
}
