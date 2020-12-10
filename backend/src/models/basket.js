/**
 * Model representing a Basket.
 * @class Basket
 */
class Basket {
  constructor (id, productId, name, price, quantity) {
    this.id = id
    this.productId = productId
    this.name = name
    this.price = price
    this.quantity = quantity
  }
}

module.exports = Basket
