/**
 * Model representing a Product.
 * @class Product
 */
class Product {
  constructor (id = null, orgNumber, name, description, price, salePrice = null, unit, inStock, categories = [], images = []) {
    this.id = id
    this.orgNumber = orgNumber
    this.name = name
    this.description = description
    this.price = price
    this.salePrice = salePrice
    this.unit = unit
    this.inStock = inStock
    this.categories = categories
    this.images = images
  }
}

module.exports = Product
