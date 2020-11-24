class address {
  constructor(streetAddress, zip, city, type) {
    this.streetAddress = streetAddress
    this.zip = zip
    this.city = city
    this.type = type
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
  * @param {string} streetAddress
  */
  set streetAddress(streetAddress) {
    this._streetAddress = streetAddress
  }
  get streetAddress() {
    return this._streetAddress
  }
  
   /**
  * @param {int} zip
  */
  set zip(zip) {
    this._zip = zip
  }
  get zip() {
    return this._zip
  }
  
   /**
  * @param {string} city
  */
  set city(city) {
    this._city = city
  }
  get city() {
    return this._city
  }

   /**
  * @param {string} type
  */
  set type(type) {
    this._type = type  
  }
  get type() {
    return this._type
  }

}

module.exports = address
