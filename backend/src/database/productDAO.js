const pool = require('./databaseConnection')

const productDAO = {}

/**
 * Registers a new product
 *
 * @param {} product
 * @param {} categoryId
 */
productDAO.create = async (product, categoryId) => {
  let conn
  try {
    conn = await pool.getConnection()

    const { orgNumber, name, desc, price, unit, inStock } = product

    const productResponse = await conn.query(
      `INSERT INTO product (producer_org_no, name, description, price, unit, in_stock) 
      VALUES ('${orgNumber}', '${name}', '${desc}', ${price}, '${unit}', ${inStock})`
    )
    const productId = productResponse.insertId

    await conn.query(`INSERT INTO product_category (product_id, category_id) VALUES ('${productId}', '${categoryId}')`)
  } catch (error) {
    return error
  } finally {
    if (conn) conn.release()
  }
}

/**
 * Updates a product
 *
 * @param {*} product
 * @param {*} categoryId
 */
productDAO.update = async (product, categoryId) => {
  let conn
  try {
    conn = await pool.getConnection()

    const { id, orgNumber, name, desc, price, unit, inStock } = product

    await conn.query(
      `UPDATE product 
      SET producer_org_no='${orgNumber}', name='${name}', description='${desc}', price=${price}, unit='${unit}', in_stock=${inStock} 
      WHERE id=${id}`
    )

    await conn.query(
      `UPDATE product_category 
      SET category_id=${categoryId} 
      WHERE product_id=${id}`
    )
  } catch (error) {
    return error
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
    const [row] = await conn.query(`SELECT * FROM product WHERE id=('${productId}')`)
    return row
  } catch (error) {
    return error
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
    const rows = await conn.query('SELECT * FROM product')
    return rows
  } catch (error) {
    return error
  } finally {
    if (conn) conn.release()
  }
}

/**
 * Gets all products from a specific producer
 *
 * @param {} orgNumber
 */
productDAO.getAllByOrgNumber = async (orgNumber) => {
  let conn
  try {
    conn = await pool.getConnection()
    // Todo: Limit this for X amount of rows.
    const rows = await conn.query(`SELECT * FROM product WHERE producer_org_no=('${orgNumber}')`)
    return rows
  } catch (error) {
    return error
  } finally {
    if (conn) conn.release()
  }
}

/**
 * Deletes a product
 *
 * @param {} productId
 */
productDAO.delete = async (productId) => {
  let conn
  try {
    conn = await pool.getConnection()
    await conn.query(`DELETE FROM product WHERE id=${productId}`)
  } catch (error) {
    return error
  } finally {
    if (conn) conn.release()
  }
}

productDAO.getAllCategories = async () => {
  let conn
  try {
    conn = await pool.getConnection()
    let categories = await conn.query('SELECT name, id FROM category WHERE parent_id IS NULL')
    return categories
  } catch (error) {
    throw error
  } finally {
    if (conn) conn.release()
  }
}

productDAO.getAllSubCategories = async () => {
  let conn
  try {
    conn = await pool.getConnection()
    let subcategories = await conn.query('SELECT name, id, parent_id FROM category WHERE parent_id IS NOT NULL')
    return subcategories
  } catch (error) {
    throw error
  } finally {
    if (conn) conn.release()
  }
}

module.exports = productDAO
