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
  return basketCache.set(basket.id, basket)
}

/**
 * Gets a backet
 *
 * @param {object} req
 */
service.get = async (req) => {
  const id = req.params.id
  return parseBasket(basketCache.get(id))
}

/**
 * Parses and returns the request body as a Basket
 *
 * @param {object} object
 * @returns {Basket} basket
 */
const parseBasket = (object) => {
  console.log(object)
  return new Basket(
    parseInt(object.id),
    parseInt(object.productId),
    object.name,
    parseInt(object.price),
    parseInt(object.quantity)
  )
}

module.exports = service
