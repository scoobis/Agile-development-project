const productDAO = require('../database/productDAO')
const userDAO = require('../database/userDAO')

const service = {}

service.isUndefined = (object) => typeof object === 'undefined' || object === null

service.isArray = (array) => Array.isArray(array)

service.isValidName = (name) => name.length > 0 && name.length <= 20

service.isValidPrice = (price) => price > 0 && price <= 1000000

service.isValidSalePrice = (salePrice, price) => salePrice < price

service.isValidUnit = (unit) => unit.length > 0 && unit.length <= 20

service.isValidInStock = (inStock) => inStock >= 0 && inStock <= 9999999

service.isValidCategories = (categories) => categories.length > 0

service.isValidOrgNumber = async (orgNumber) => {
  const producer = await userDAO.getProducerByOrgNumber(orgNumber)
  if (producer) {
    return true
  } else {
    return false
  }
}

service.isValidCategory = async (categories) => {
  for await (const categoryId of categories) {
    const category = await productDAO.getCategoryById(categoryId)
    if (!category) {
      return false
    }
  }

  return true
}

module.exports = service
