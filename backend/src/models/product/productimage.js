
module.exports = class ProductImage {
  constructor (id = null, productId = null, imageName, altText) {
    this.id = id
    this.productId = productId
    this.imageName = imageName
    this.altText = altText
  }
}
