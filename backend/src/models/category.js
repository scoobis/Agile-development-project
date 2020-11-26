class category {
  constructor(name, desc) {
    this.name = name
    this.desc = desc
  }

  /**
   * @param {any} id
   */
  set id(id) {
    this._id = id
  }
  get id() {
    return this._id
  }

  /**
   * @param {any} name
   */
  set name(name) {
    this._name = name
  }
  get name() {
    return this._name
  }

  /**
   * @param {any} desc
   */
  set desc(desc) {
    this._desc = desc
  }
  get desc() {
    return this._desc
  }

}

module.exports = category
