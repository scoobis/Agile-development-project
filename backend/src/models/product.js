class product {
  constructor (id = null, orgNumber, name, desc, price, salePrice = null, unit, inStock, categories = [], images = []) {
    this.id = id
    this.orgNumber = orgNumber
    this.name = name
    this.desc = desc
    this.price = price
    this.salePrice = salePrice
    this.unit = unit
    this.inStock = inStock
    this.categories = categories
    this.images = images
  }
}

module.exports = product
