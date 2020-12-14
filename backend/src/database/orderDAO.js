const pool = require('./databaseConnection')

const orderDAO = {}

orderDAO.order = async (order) => {
  let conn
  const generatedDate = new Date()
  try {
    conn = await pool.getConnection()
    await conn.beginTransaction()

    const insertOrderQuery = 'INSERT INTO orders (producer_org_no, customer_name, customer_phone_no, customer_street_address, customer_zip, customer_city, shipping_method, payment_method, subtotal, shipping, discount, total, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    const insertProductsQuery = 'INSERT INTO order_product (order_id, product_id, name, unit, price, quantity) VALUES (?, ?, ?, ?, ?, ?)'
    const { orgNumber, customerName, customerPhone, customerStreetAddress, customerZip, customerCity, shippingMethod, paymentMethod, subtotal, shipping, discount, total } = order
    const date = generatedDate.toISOString().slice(0, 10)
    const response = await conn.query(insertOrderQuery, [orgNumber, customerName, customerPhone, customerStreetAddress, customerZip, customerCity, shippingMethod, paymentMethod, subtotal, shipping, discount, total, date])
    const id = response.insertId

    const queryResults = []

    order.products.forEach(
      product => queryResults.push(
        conn.query(insertProductsQuery, [id, product.productId, product.name, product.unit, product.price, product.quantity])
          .catch(error => { throw error })
      )
    )

    await Promise.all(queryResults)
    await conn.commit()
  } catch (error) {
    conn.rollback()
    throw error
  } finally {
    if (conn) conn.release()
  }
}
module.exports = orderDAO
