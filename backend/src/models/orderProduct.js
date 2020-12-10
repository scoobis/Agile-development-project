/**
 * Model representing a OrderProduct. (An product in an order)
 * @class OrderProduct
 */
module.exports = class OrderProduct {
  constructor (orderId = null, productId, quantity, price) {
    this.orderId = orderId
    this.productId = productId
    this.quantity = quantity
    this.price = price
  }
}
