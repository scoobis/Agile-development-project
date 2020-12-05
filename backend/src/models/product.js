class product {
  constructor (orgNumber, name, desc, price, unit, inStock, categories) {
    this.orgNumber = orgNumber
    this.name = name
    this.desc = desc
    this.price = price
    this.unit = unit
    this.inStock = inStock
    this.categories = categories
  }
}

module.exports = product
