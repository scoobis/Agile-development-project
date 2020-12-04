const pool = require('./databaseConnection')
const createError = require('http-errors')

const productDAO = {}

/**
 * Registers a new product
 *
 * @param {} product
 * @param {} categoryId
 */
productDAO.create = async (product, files) => {
  let conn
  try {
    conn = await pool.getConnection()
    await conn.beginTransaction()

    const { orgNumber, name, desc, price, unit, inStock, categories } = product
    const queryResults = []

    const productResponse = await conn.query(
      `INSERT INTO product (producer_org_no, name, description, price, unit, in_stock) 
      VALUES (?, ?, ?, ?, ?, ?)`, [orgNumber, name, desc, price, unit, inStock])

    const productId = productResponse.insertId
    const productImgQuery = 'INSERT INTO product_image (product_id, image_name, alt_text) VALUES (?, ?, ?)'

    files.forEach(
      file => queryResults.push(
        conn.query(productImgQuery, [productId, file.filename, file.originalname])
          .catch(error => { throw error })
      )
    )

    categories.forEach(
      categoryId => queryResults.push(
        conn.query('INSERT INTO product_category value (?, ?)', [productId, categoryId])
          .catch(error => { throw error })
      )
    )

    await Promise.all(queryResults)
    await conn.commit()
  } catch (error) {
    // Roll back the sql transaaction
    conn.rollback()
    throw error
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
productDAO.update = async (product) => {
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
      // This one does not work yet with the new category system
      // await conn.query(
      //   'UPDATE product_category SET category_id=? WHERE product_id=?', [categoryId, id]
      // )
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

/**
 * Gets all products from a specific category
 *
 * @param {*} categoryId
 */
productDAO.getAllByCategoryId = async (categoryId) => {
  let conn
  const products = []
  try {
    conn = await pool.getConnection()
    const productIds = await conn.query('SELECT product_id FROM product_category WHERE category_id=?', [categoryId])
    if (productIds.length > 0) {
      for await (const productId of productIds) {
        for (const key in productId) {
          const [product] = await conn.query('SELECT * FROM product WHERE id=?', [productId[key]])
          products.push(product)
        }
      }
      return products
    } else {
      throw createError(400, 'No products found!')
    }
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

/**
 * Gets all categories from a specific product
 *
 * @param {*} productId
 */
productDAO.getCategoriesByProductId = async (productId) => {
  let conn
  const categories = []
  try {
    conn = await pool.getConnection()
    const categoryIds = await conn.query('SELECT category_id FROM product_category WHERE product_id=?', [productId])
    if (categoryIds.length > 0) {
      for await (const categoryId of categoryIds) {
        for (const key in categoryId) {
          const [category] = await conn.query('SELECT * FROM category WHERE id=?', [categoryId[key]])
          categories.push(category)
        }
      }
      return categories
    } else {
      throw createError(400, 'No categories found!')
    }
  } finally {
    if (conn) conn.release()
  }
}

module.exports = productDAO
