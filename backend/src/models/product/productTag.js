/**
 * Model representing a ProductTag.
 * @class ProductTag
 */
class ProductTag {
  constructor (id = null, name, productId) {
    this.id = id
    this.name = name
    this.productId = productId
  }
}

module.exports = ProductTag
