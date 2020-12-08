const pool = require('./databaseConnection')
const createError = require('http-errors')
const Product = require('../models/product')

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
    // const productImgQuery = 'INSERT INTO product_image (product_id, image_name, alt_text) VALUES (?, ?, ?)'

    // files.forEach(
    //   file => queryResults.push(
    //     conn.query(productImgQuery, [productId, file.filename, file.originalname])
    //       .catch(error => { throw error })
    //   )
    // )

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
    await conn.beginTransaction()

    const { id, orgNumber, name, desc, price, unit, inStock, categories } = product
    const queryResults = []

    const updateProductQuery = 'UPDATE product SET producer_org_no=?, name=?, description=?, price=?, unit=?, in_stock=? WHERE id=?'
    const deleteAllOldCategoriesFromProductQuery = 'DELETE FROM product_category WHERE product_id=?'
    const insertNewCategoryToProductQuery = 'INSERT INTO product_category value (?, ?)'

    await conn.query(updateProductQuery, [orgNumber, name, desc, price, unit, inStock, id])

    await conn.query(deleteAllOldCategoriesFromProductQuery, [id])

    categories.forEach(
      categoryId => queryResults.push(
        conn.query(insertNewCategoryToProductQuery, [id, categoryId])
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
    const { id, producer_org_no, name, description, price, unit, in_stock } = row
    // get categories
    // const categoryArray? = await productDAO.getCategoriesByProductId(id)
    // get images
    const imageArray = await conn.query('SELECT * FROM product_image WHERE product_id = ?', [productId])
    return new Product(id, producer_org_no, name, description, price, null, unit, in_stock, [], imageArray)
    // return row
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

    const selectAllProducts = 'SELECT id, producer_org_no, name, description, price, unit, in_stock FROM product'
    const products = []

    const rows = await conn.query(selectAllProducts)

    if (rows.length > 0) {
      for await (const row of rows) {
        const product = getProduct(row)

        product.categories = await productDAO.getCategoriesByProductId(product.id)

        // getImages

        products.push(product)
      }

      return products
    } else {
      throw createError(400, 'No products found!')
    }
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

    const selectAllProductsByOrgNumber = 'SELECT id, producer_org_no, name, description, price, unit, in_stock FROM product WHERE producer_org_no=?'
    const products = []

    const rows = await conn.query(selectAllProductsByOrgNumber, [orgNumber])

    if (rows.length > 0) {
      for await (const row of rows) {
        const product = getProduct(row)

        product.categories = await productDAO.getCategoriesByProductId(product.id)

        // getImages

        products.push(product)
      }

      return products
    } else {
      throw createError(400, 'No products found!')
    }
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
  try {
    conn = await pool.getConnection()

    const selectAllProductsByCategoryId = 'SELECT product_id FROM product_category WHERE category_id=?'
    const selectAllProductsById = 'SELECT id, producer_org_no, name, description, price, unit, in_stock FROM product WHERE id=?'
    const products = []

    const productIds = await conn.query(selectAllProductsByCategoryId, [categoryId])

    if (productIds.length > 0) {
      for await (const productId of productIds) {
        for (const key in productId) {
          const [row] = await conn.query(selectAllProductsById, [productId[key]])

          const product = getProduct(row)

          product.categories = await productDAO.getCategoriesByProductId(product.id)

          // getImages

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
 * Gets a category by its id
 *
 * @param {*} id
 */
productDAO.getCategoryById = async (id) => {
  let conn
  try {
    conn = await pool.getConnection()
    const selectCategoryByIdQuery = 'SELECT id, name FROM category WHERE id=?'
    const [category] = await conn.query(selectCategoryByIdQuery, [id])
    return category
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
  // Maybe take conn as parameter, as its only used as help method at the moment
  let conn
  try {
    conn = await pool.getConnection()

    const selectAllCategoriesFromProductQuery = 'SELECT category_id FROM product_category WHERE product_id=?'
    const selectCategoryByIdQuery = 'SELECT id, parent_id, name, description FROM category WHERE id=?'
    const categories = []

    const categoryIds = await conn.query(selectAllCategoriesFromProductQuery, [productId])

    if (categoryIds.length > 0) {
      for await (const categoryId of categoryIds) {
        for (const key in categoryId) {
          const [category] = await conn.query(selectCategoryByIdQuery, [categoryId[key]])
          categories.push(category)
        }
      }
    }

    return categories
  } finally {
    if (conn) conn.release()
  }
}

/**
 * Returns a Product
 *
 * @param {*} row
 */
const getProduct = (row) => {
  const { id, producer_org_no, name, description, price, unit, in_stock } = row
  return new Product(id, producer_org_no, name, description, price, null, unit, in_stock, [], [])
}

module.exports = productDAO
