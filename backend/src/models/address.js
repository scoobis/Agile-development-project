/**
 * Model representing an Address.
 * @class Address
 */
class Address {
  constructor (id = null, streetAddress, zip, city, type = 'business') {
    this.id = id
    this.streetAddress = streetAddress
    this.zip = zip
    this.city = city
    this.type = type
  }
}

module.exports = Address
