const pool = require('./databaseConnection')
const createError = require('http-errors')
const Order = require('../models/order')
const OrderProduct = require('../models/orderProduct')

const orderDAO = {}

orderDAO.order = async (order) => {
  let conn
  const generatedDate = new Date()
  try {
    conn = await pool.getConnection()
    await conn.beginTransaction()

    const insertOrderQuery =
      'INSERT INTO orders (producer_org_no, customer_name, customer_email, customer_phone_no, customer_street_address, customer_zip, customer_city, shipping_method, payment_method, subtotal, shipping, discount, total, created, order_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    const insertProductsQuery = 'INSERT INTO order_product (order_id, product_id, name, unit, price, quantity) VALUES (?, ?, ?, ?, ?, ?)'
    const {
      orgNumber,
      customerName,
      customerEmail,
      customerPhone,
      customerStreetAddress,
      customerZip,
      customerCity,
      shippingMethod,
      paymentMethod,
      subtotal,
      shipping,
      discount,
      total
    } = order
    const date = generatedDate.toISOString().slice(0, 10)
    const statuss = 'Inkommen'
    const response = await conn.query(insertOrderQuery, [
      orgNumber,
      customerName,
      customerEmail,
      customerPhone,
      customerStreetAddress,
      customerZip,
      customerCity,
      shippingMethod,
      paymentMethod,
      subtotal,
      shipping,
      discount,
      total,
      date,
      statuss
    ])
    const id = response.insertId

    const queryResults = []

    order.products.forEach((product) =>
      queryResults.push(
        conn.query(insertProductsQuery, [id, product.productId, product.name, product.unit, product.price, product.quantity]).catch((error) => {
          throw error
        })
      )
    )

    await Promise.all(queryResults)
    await conn.commit()

    for (const product of order.products) {
      const getSaldo = 'SELECT in_stock FROM product WHERE id=?'
      const setSaldo = 'UPDATE product SET in_stock=? WHERE id=?'
      const result = await pool.query(getSaldo, product.productId)
      const saldo = Number(result[0].in_stock)
      const newSaldo = saldo - product.quantity
      await pool.query(setSaldo, [newSaldo, product.productId])
    }
  } catch (error) {
    conn.rollback()
    throw error
  } finally {
    if (conn) conn.release()
  }
}

orderDAO.getAllOrdersFromProducer = async (orgNumber) => {
  const getAllOrders = 'SELECT * FROM orders WHERE producer_org_no=?'
  const getAllProductsFromOrder = 'SELECT * FROM order_product WHERE order_id=?'
  const orders = await pool.query(getAllOrders, orgNumber)

  if (orders) {
    for (const order of orders) {
      const products = await pool.query(getAllProductsFromOrder, order.id)
      order.products = products
    }

    return parseOrder(orders)
  } else {
    throw createError(400, 'You do not have any orders!')
  }
}

orderDAO.updateStatus = async (status, id) => {
  const update = 'UPDATE orders SET order_status=? WHERE id=?'
  const result = await pool.query(update, [status, id])

  if (result.affectedRows === 0) {
    throw createError(400, 'Order not found')
  }
}

orderDAO.getCustomerEmail = async (id) => {
  const selectEmailQuery = 'SELECT customer_email FROM orders WHERE id=?'
  const customerEmail = await pool.query(selectEmailQuery, id)

  if (customerEmail.length !== 0) {
    return customerEmail[0].customer_email
  }
}

const parseOrder = (object) => {
  const orders = []
  object.forEach((order) => {
    const arrayWithOrderProducts = []
    order.products.forEach((element) => {
      arrayWithOrderProducts.push(
        new OrderProduct(element.orderId, element.productId, element.name, element.unit, element.price, element.quantity, element.id)
      )
    })

    orders.push(
      new Order(
        order.producer_org_no,
        order.customer_name,
        order.customer_email,
        order.customer_phone_no,
        order.customer_street_address,
        order.customer_zip,
        order.customer_city,
        arrayWithOrderProducts,
        order.shipping_method,
        order.payment_method,
        order.subtotal,
        order.shipping,
        order.discount,
        order.total,
        order.created,
        order.order_status,
        order.id
      )
    )
  })
  return orders
}

module.exports = orderDAO
