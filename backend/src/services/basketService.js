const Basket = require('../models/basket')
const NodeCache = require('node-cache')
const basketCache = new NodeCache()

const service = {}

/**
 * Saves/Updates a basket
 *
 * @param {object} req
 */
service.save = async (req) => {
  const basket = parseBasket(req.body)
  const result = basketCache.set(basket.id, basket)
  const hej = basketCache.get(basket.id)
  console.log(hej)
  return result
}

/**
 * Parses and returns the request body as a Basket
 *
 * @param {object} object
 * @returns {Basket} basket
 */
const parseBasket = (object) => {
  return new Basket(
    parseInt(object.id),
    parseInt(object.productId),
    object.name,
    parseInt(object.price),
    parseInt(object.quantity)
  )
}

module.exports = service
