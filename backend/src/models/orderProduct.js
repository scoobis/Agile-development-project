/**
 * Model representing a OrderProduct. (An product in an order)
 * @class OrderProduct
 */
class OrderProduct {
  constructor (orderId, productId, name, unit, price, quantity, id = null) {
    this.orderId = orderId
    this.productId = productId
    this.name = name
    this.unit = unit
    this.price = price
    this.quantity = quantity
    this.id = id
  }
}

module.exports = OrderProduct
