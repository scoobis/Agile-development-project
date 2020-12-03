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

  /**
   * @param {any} id
   */
  set id (id) {
    this._id = id
  }

  get id () {
    return this._id
  }

  /**
   * @param {any} name
   */
  set name (name) {
    this._name = name
  }

  get name () {
    return this._name
  }

  /**
   * @param {any} desc
   */
  set desc (desc) {
    this._desc = desc
  }

  get desc () {
    return this._desc
  }

  /**
   * @param {any} price
   */
  set price (price) {
    this._price = price
  }

  get price () {
    return this._price
  }

  /**
   * @param {any} unit
   */
  set unit (unit) {
    this._unit = unit
  }

  get unit () {
    return this._unit
  }

  /**
   * @param {any} inStock
   */
  set inStock (inStock) {
    this._inStock = inStock
  }

  get inStock () {
    return this._inStock
  }

  /**
   * @param {string} orgNumber
   */
  set orgNumber (orgNumber) {
    this._orgNumber = orgNumber
  }

  get orgNumber () {
    return this._orgNumber
  }

  /**
   * @param {any} categories
   */
  set categories (categories) {
    this._categories = categories
  }

  get categories () {
    return this._categories
  }
}

module.exports = product
