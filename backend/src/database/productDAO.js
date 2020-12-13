const pool = require('./databaseConnection')
const createError = require('http-errors')
const Product = require('../models/product')
const ProductImage = require('../models/productimage')

const productDAO = {}

/**
 * Registers a new product.
 *
 * @param {Product} product
 * @throws {Error}
 */
productDAO.create = async (product, files) => {
  let conn
  try {
    conn = await pool.getConnection()
    await conn.beginTransaction()

    const insertProductQuery = 'INSERT INTO product (producer_org_no, name, description, price, sale_price, unit, in_stock) VALUES (?, ?, ?, ?, ?, ?, ?)'
    const insertProductImgQuery = 'INSERT INTO product_image (product_id, image_name, alt_text) VALUES (?, ?, ?)'
    const insertProductCategoryQuery = 'INSERT INTO product_category value (?, ?)'
    const { orgNumber, name, description, price, unit, salePrice, inStock, categories } = product
    const queryResults = []

    const productResponse = await conn.query(insertProductQuery, [orgNumber, name, description, price, salePrice, unit, inStock])
    const productId = productResponse.insertId

    files.forEach(
      file => queryResults.push(
        conn.query(insertProductImgQuery, [productId, file.filename, file.originalname])
          .catch(error => { throw error })
      )
    )

    categories.forEach(
      categoryId => queryResults.push(
        conn.query(insertProductCategoryQuery, [productId, categoryId])
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

    const { id, orgNumber, name, description, price, salePrice, unit, inStock, categories } = product
    const queryResults = []

    const updateProductQuery = 'UPDATE product SET producer_org_no=?, name=?, description=?, price=?, sale_price=?, unit=?, in_stock=? WHERE id=?'
    const deleteAllOldCategoriesFromProductQuery = 'DELETE FROM product_category WHERE product_id=?'
    const insertNewCategoryToProductQuery = 'INSERT INTO product_category value (?, ?)'

    await conn.query(updateProductQuery, [orgNumber, name, description, price, salePrice, unit, inStock, id])

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
 * Deletes a product.
 *
 * @param {number} productId
 */
productDAO.delete = async (productId) => {
  let conn
  try {
    conn = await pool.getConnection()
    // TODO: Transaction; remove category relation and images.

    const deleteProductByIdQuery = 'DELETE FROM product WHERE id=?'

    const result = await conn.query(deleteProductByIdQuery, [productId])

    if (!result.affectedRows) {
      throw createError(400, 'Product not found!')
    }
  } finally {
    if (conn) conn.release()
  }
}

/**
 * Get product data.
 *
 * @param {number} productId
 *
 * @return {Promise<Product>}
 * @throws {SqlError} - SqlError|Error Object
 */
productDAO.get = async (productId) => {
  const selectProductById = 'SELECT * FROM product WHERE id=?'
  const [row] = await pool.query(selectProductById, [productId])

  const product = parseProduct(row)
  product.categories = await productDAO.getCategoriesByProductId(product.id)
  product.images = await productDAO.getImages(product.id)

  return product
}

/**
 * Gets all products
 *
 * @return {Promise<Product[]>}
 * @throws {( HttpError | SqlError )} - HttpError|SqlError|Error
 */
productDAO.getAll = async () => {
  const selectAllProducts = 'SELECT id, producer_org_no, name, description, price, sale_price, unit, in_stock FROM product' // LIMIT 100?
  const products = []

  const rows = await pool.query(selectAllProducts)

  if (rows.length > 0) {
    for (const row of rows) {
      const product = parseProduct(row)
      product.categories = await productDAO.getCategoriesByProductId(product.id)
      product.images = await productDAO.getImages(product.id)
      products.push(product)
    }

    return products
  } else {
    // TODO: Should we really throw when nothing went wrong?
    throw createError(400, 'No products found!')
  }
}

/**
 * Get all products from a specific producer.
 *
 * @param {number} orgNumber
 * @return {Product[]}
 */
productDAO.getAllByOrgNumber = async (orgNumber) => {
  const selectAllProductsByOrgNumber = 'SELECT id, producer_org_no, name, description, price, sale_price, unit, in_stock FROM product WHERE producer_org_no=?'
  const products = []
  const rows = await pool.query(selectAllProductsByOrgNumber, [orgNumber])

  if (rows.length > 0) {
    for await (const row of rows) {
      const product = parseProduct(row)
      product.categories = await productDAO.getCategoriesByProductId(product.id)
      product.images = await productDAO.getImages(product.id)
      products.push(product)
    }

    return products
  } else {
    throw createError(400, 'No products found!')
  }
}

/**
 * Gets all products from a specific category.
 *
 * @param {number} categoryId
 * @return {Product[]}
 */
productDAO.getAllByCategoryId = async (categoryId) => {
  let conn
  try {
    conn = await pool.getConnection()

    const selectAllProductsByCategoryId = 'SELECT product_id FROM product_category WHERE category_id=?'
    const selectAllProductsById = 'SELECT id, producer_org_no, name, description, price, sale_price, unit, in_stock FROM product WHERE id=?'
    const products = []

    const productIds = await conn.query(selectAllProductsByCategoryId, [categoryId])

    if (productIds.length > 0) {
      for await (const productId of productIds) {
        for (const key in productId) {
          const [row] = await conn.query(selectAllProductsById, [productId[key]])

          const product = parseProduct(row)

          product.categories = await productDAO.getCategoriesByProductId(product.id)

          product.images = await conn.query('SELECT * FROM product_image WHERE product_id = ?', [product.id])

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

/**
 * Get all categories.
 * @return {*[]}
 */
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

/**
 * Get all sub-categories.
 * @return {*[]}
 */
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
 * @param {number} id
 * @return {*}
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
 * Get all categories for a specific product.
 *
 * @param {number} productId
 * @return {*[]}
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
 * Get the images belonging to a product.
 * @param {number} productId - The associated productid.
 * @return {ProductImage[]}
 * @throws {SqlError}
 */
productDAO.getImages = async (productId) => {
  const images = []
  const result = await pool.query('SELECT * FROM product_image WHERE product_id = ?', [productId])
  result.forEach(
    result => images.push(new ProductImage(result.id, result.product_id, result.image_name, result.alt_text))
  )
  return images
}

/**
 *
 * Private functions.
 *
 */

/**
 * Parses result set to a Product.
 *
 * @param {*} row
 * @return {Product}
 */
const parseProduct = (row) => {
  return new Product(row.id, row.producer_org_no, row.name, row.description, row.price, row.sale_price, row.unit, row.in_stock, [], [])
}

module.exports = productDAO
