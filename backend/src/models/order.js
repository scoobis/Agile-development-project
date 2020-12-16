/**
 * Model representing a Order.
 * @class Order
 */
module.exports = class Order {
  constructor(
    orgNumber,
    customerName,
    customerEmail,
    customerPhone,
    customerStreetAddress,
    customerZip,
    customerCity,
    products,
    shippingMethod,
    paymentMethod,
    subtotal,
    shipping,
    discount,
    total,
    created,
    id = null
  ) {
    this.orgNumber = orgNumber
    this.customerName = customerName
    this.customerEmail = customerEmail
    this.customerPhone = customerPhone
    this.customerStreetAddress = customerStreetAddress
    this.customerZip = customerZip
    this.customerCity = customerCity
    this.products = products
    this.shippingMethod = shippingMethod
    this.paymentMethod = paymentMethod
    this.subtotal = subtotal
    this.shipping = shipping
    this.discount = discount
    this.total = total
    this.created = created
    this.id = id
  }
}
