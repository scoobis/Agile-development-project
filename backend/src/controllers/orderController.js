const service = require('../services/orderService')
const createError = require('http-errors')
const Order = require('../models/order')
const OrderProduct = require('../models/orderProduct')

const controller = {}

controller.get = async (req, res, next) => {
  try {
    const order = await service.get(req)
    if (order) {
      res.status(200).json(order)
    } else {
      throw createError(400, 'Order does not exist')
    }
  } catch (error) {
    return next(error)
  }
}

controller.sendorder = async (req, res, next) => {
  try {
    const order = parseOrder(req.body)

    await service.order(order)
    res.status(200).json({ success: true, message: 'Order placed!' })
  } catch (error) {
    return next(error)
  }
}

const parseOrder = (object) => {
  const arrayWithOrderProducts = []
  object.products.forEach(element => {
    arrayWithOrderProducts.push(
      new OrderProduct(
        element.orderId,
        element.productId,
        element.name,
        element.unit,
        element.price,
        element.quantity
      )
    )
  })

  return new Order(
    object.orgNumber,
    object.customerName,
    object.customerPhone,
    object.customerStreetAddress,
    object.customerZip,
    object.customerCity,
    arrayWithOrderProducts,
    object.shippingMethod,
    object.paymentMethod,
    object.subtotal,
    object.shipping,
    object.discount,
    object.total,
    object.created
  )
}

module.exports = controller
