const pool = require('./databaseConnection')

const productDAO = {}

/**
 * Registers a new product
 * 
 * @param {product} product
 */
productDAO.create = async (product, categoryId) => {
  let conn;
  try {
    conn = await pool.getConnection();
    
    const productResponse = await conn.query("INSERT INTO product (producer_org_no, name, description, price, unit, in_stock) VALUES ('" + product.orgNumber + "', '" + product.name + "', '" + product.desc + "', '" + product.price + "', '" + product.unit + "', '" + product.inStock + "')")
    const productId = productResponse.insertId
    
    conn.query("INSERT INTO product_category (product_id, category_id) VALUES ('" + productId + "', '" + categoryId + "')")

  } catch (error) {
    throw error
  } finally {
    if (conn) conn.release()
  }
}

module.exports = productDAO
