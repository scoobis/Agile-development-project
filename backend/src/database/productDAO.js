const pool = require('./databaseConnection')

const productDAO = {}

/**
 * Registers a new product
 *
 * @param {product} product
 */
productDAO.create = async (product, categoryId) => {
  let conn
  try {
    conn = await pool.getConnection()

    const { orgNumber, name, desc, price, unit, inStock } = product

    const productResponse = await conn.query(
      `INSERT INTO product (producer_org_no, name, description, price, unit, in_stock) VALUES ('${orgNumber}', '${name}', '${desc}', ${price}, '${unit}', ${inStock})`
    )
    const productId = productResponse.insertId

    await conn.query("INSERT INTO product_category (product_id, category_id) VALUES ('" + productId + "', '" + categoryId + "')")
  } catch (error) {
    throw error
  } finally {
    if (conn) conn.release()
  }
}

/**
 * Gets a product by its id
 *
 * @param {} productId
 */
productDAO.get = async (productId) => {
  let conn
  try {
    conn = await pool.getConnection()
    let [row] = await conn.query(`SELECT * FROM product WHERE id=('${productId}')`)
    return row
  } catch (error) {
    throw error
  } finally {
    if (conn) conn.release()
  }
}

/**
 * Gets all products
 *
 */
productDAO.getAll = async () => {
  let conn
  try {
    conn = await pool.getConnection()
    // Todo: Limit this for X amount of rows.
    let rows = await conn.query('SELECT * FROM product')
    return rows
  } catch (error) {
    throw error
  } finally {
    if (conn) conn.release()
  }
}

/**
 * Gets all products from a specific producer
 *
 */
productDAO.getAllByOrgNumber = async (orgNumber) => {
  let conn
  try {
    conn = await pool.getConnection()
    // Todo: Limit this for X amount of rows.
    let rows = await conn.query("SELECT * FROM product WHERE producer_org_no=('" + orgNumber + "')")
    return rows
  } catch (error) {
    throw error
  } finally {
    if (conn) conn.release()
  }
}

module.exports = productDAO
