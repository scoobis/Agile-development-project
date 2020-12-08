const productDAO = require("../database/productDAO")

const service = {}

service.isUndefined = (object) => typeof object === 'undefined'

service.isArray = (array) => Array.isArray(array)

service.isValidName = (name) => name.length > 0 && name.length <= 20

service.isValidPrice = (price) => price > 0 && price <= 1000000

service.isValidSalePrice = (salePrice, price) => salePrice < price

service.isValidUnit = (unit) => unit.length > 0 && unit.length <= 20

service.isValidInStock = (inStock) => inStock >= 0 && inStock <= 9999999

service.isValidCategories = (categories) => categories.length > 0

module.exports = service
