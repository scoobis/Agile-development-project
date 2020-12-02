const pool = require('./databaseConnection')
const createError = require('http-errors')

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

    // TODO: Fix Transaction.
    const productResponse = await conn.query(
      `INSERT INTO product (producer_org_no, name, description, price, unit, in_stock) 
      VALUES ('${orgNumber}', '${name}', '${desc}', ${price}, '${unit}', ${inStock})`
    )
    const productId = productResponse.insertId

    await conn.query(
      'INSERT INTO product_category value (?, ?)', [productId, categoryId]
    )
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
    // TODO: Fix Transaction.

    const result = await conn.query(
      'UPDATE product SET producer_org_no=?, name=?, description=?, price=?, unit=?, in_stock=? WHERE id=?',
      [orgNumber, name, desc, price, unit, inStock, id]
    )

    if (result.affectedRows) {
      // If exists, else INSERT
      await conn.query(
        'UPDATE product_category SET category_id=? WHERE product_id=?', [categoryId, id]
      )
    } else {
      throw createError(400, 'Product not found!')
    }
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
    const result = await conn.query('DELETE FROM product WHERE id=?', [productId])

    if (!result.affectedRows) {
      throw createError(400, 'Product not found!')
    }
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
    const [row] = await conn.query('SELECT * FROM product WHERE id=?', [productId])
    return row
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
    const rows = await conn.query('SELECT * FROM product WHERE producer_org_no=?', [orgNumber])
    return rows
  } finally {
    if (conn) conn.release()
  }
}

productDAO.getAllCategories = async () => {
  let conn
  try {
    conn = await pool.getConnection()
    const categories = await conn.query('SELECT name, id FROM category WHERE parent_id IS NULL')
    return categories
  } finally {
    if (conn) conn.release()
  }
}

productDAO.getAllSubCategories = async () => {
  let conn
  try {
    conn = await pool.getConnection()
    const subcategories = await conn.query('SELECT name, id, parent_id FROM category WHERE parent_id IS NOT NULL')
    return subcategories
  } finally {
    if (conn) conn.release()
  }
}

module.exports = productDAO
