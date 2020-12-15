const pool = require('./databaseConnection')
const createError = require('http-errors')
const Product = require('../models/product/product')
const ProductImage = require('../models/product/productimage')
const Category = require('../models/category')
const ProductTag = require('../models/product/productTag')

const productDAO = {}

/**
 * Registers a new product.
 *
 * @param {Product} product
 * @throws {SqlError|Error} - SqlError|Error
 */
productDAO.create = async (product, files) => {
  let conn
  try {
    conn = await pool.getConnection()
    await conn.beginTransaction()

    const insertProductQuery = 'INSERT INTO product (producer_org_no, name, description, price, sale_price, unit, in_stock) VALUES (?, ?, ?, ?, ?, ?, ?)'
    const insertProductImgQuery = 'INSERT INTO product_image (product_id, image_name, alt_text) VALUES (?, ?, ?)'
    const insertProductCategoryQuery = 'INSERT INTO product_category value (?, ?)'
    const insertProductTagQuery = 'INSERT INTO product_tag (name, product_id) VALUES (?, ?)'
    const { orgNumber, name, description, price, unit, salePrice, inStock, categories, tags } = product
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

    tags.forEach(
      tag => queryResults.push(
        conn.query(insertProductTagQuery, [tag, productId])
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

/**
 * Updates a product
 *
 * @param {Product} product
 * @throws {SqlError|Error} - SqlError|Error
 */
productDAO.update = async (product) => {
  let conn
  try {
    conn = await pool.getConnection()
    await conn.beginTransaction()

    const { id, orgNumber, name, description, price, salePrice, unit, inStock, categories, tags } = product
    const queryResults = []

    const updateProductQuery = 'UPDATE product SET producer_org_no=?, name=?, description=?, price=?, sale_price=?, unit=?, in_stock=? WHERE id=?'
    const deleteAllCategoriesFromProductQuery = 'DELETE FROM product_category WHERE product_id=?'
    const deleteAllTagsFromProductQuery = 'DELETE FROM product_tag WHERE product_id=?'
    const insertCategoryToProductQuery = 'INSERT INTO product_category value (?, ?)'
    const insertProductTagQuery = 'INSERT INTO product_tag (name, product_id) VALUES (?, ?)'

    await conn.query(updateProductQuery, [orgNumber, name, description, price, salePrice, unit, inStock, id])

    await conn.query(deleteAllCategoriesFromProductQuery, [id])

    await conn.query(deleteAllTagsFromProductQuery, [id])

    categories.forEach(
      categoryId => queryResults.push(
        conn.query(insertCategoryToProductQuery, [id, categoryId])
          .catch(error => { throw error })
      )
    )

    tags.forEach(
      tag => queryResults.push(
        conn.query(insertProductTagQuery, [tag, id])
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
 * @param {Number} productId
 * @throws {SqlError|HttpError} - SqlError|HttpError|Error
 */
productDAO.delete = async (productId) => {
  const deleteProductByIdQuery = 'DELETE FROM product WHERE id=?'
  const result = await pool.query(deleteProductByIdQuery, [productId])
  if (!result.affectedRows) {
    throw createError(400, 'Product not found!')
  }
}

/**
 * Get product data.
 *
 * @param {Number} productId
 * @return {Promise<Product>}
 * @throws {SqlError|HttpError} - SqlError|Error Object
 */
productDAO.get = async (productId) => {
  const selectProductById = 'SELECT * FROM product WHERE id=?'
  const [product] = await pool.query(selectProductById, [productId])
  if (product) {
    product.categories = await productDAO.getCategories(product.id)
    product.images = await productDAO.getImages(product.id)
    product.tags = await productDAO.getTags(product.id)
  } else {
    throw createError(400, 'Product not found!')
  }
  return parseProduct(product)
}

/**
 * Gets all products
 *
 * @return {Promise<Product[]>}
 * @throws {HttpError|SqlError} - HttpError|SqlError|Error
 */
productDAO.getAll = async () => {
  const selectAllProducts = 'SELECT id, producer_org_no, name, description, price, sale_price, unit, in_stock FROM product' // LIMIT 100?
  const products = []
  const rows = await pool.query(selectAllProducts)
  await Promise.all(
    rows.map(async (product) => {
      product.categories = await productDAO.getCategories(product.id)
      product.images = await productDAO.getImages(product.id)
      product.tags = await productDAO.getTags(product.id)
      products.push(parseProduct(product))
    })
  )
  return products
}

/**
 * Get all products from a specific producer.
 *
 * @param {Number} orgNumber
 * @return {Promise<Product[]>}
 */
productDAO.getAllByOrgNumber = async (orgNumber) => {
  const selectAllProductsByOrgNumber = 'SELECT id, producer_org_no, name, description, price, sale_price, unit, in_stock FROM product WHERE producer_org_no=?'
  const products = []
  const rows = await pool.query(selectAllProductsByOrgNumber, [orgNumber])
  await Promise.all(
    rows.map(async (product) => {
      product.categories = await productDAO.getCategories(product.id)
      product.images = await productDAO.getImages(product.id)
      product.tags = await productDAO.getTags(product.id)
      products.push(parseProduct(product))
    })
  )
  return products
}

/**
 * Gets all products from a specific category.
 *
 * @param {Number} categoryId
 * @return {Promise<Product[]>}
 * @throws {SqlError|HttpError|Error}
 */
productDAO.getAllByCategoryId = async (categoryId) => {
  const selectQuery =
    `SELECT p.id, p.producer_org_no, p.name, p.description, p.price, p.sale_price, p.unit, p.in_stock 
    FROM product AS p 
    INNER JOIN product_category AS pc 
    ON p.id=pc.product_id 
    WHERE pc.category_id=?`

  const products = []
  const rows = await pool.query(selectQuery, [categoryId])

  await Promise.all(
    rows.map(async (product) => {
      product.categories = await productDAO.getCategories(product.id)
      product.images = await productDAO.getImages(product.id)
      product.tags = await productDAO.getTags(product.id)
      products.push(parseProduct(product))
    })
  )
  return products
}

/**
 * Get all categories.
 *
 * @return {Promise<Category[]>}
 * @throws {SqlError|Error}
 */
productDAO.getAllCategories = async () => {
  const categories = []
  const rows = await pool.query('SELECT * FROM category WHERE parent_id IS NULL')
  rows.forEach(category => {
    categories.push(new Category(category.id, category.parent_id, category.name, category.description))
  })
  return categories
}

/**
 * Get all sub-categories.
 *
 * @return {*[]}
 */
productDAO.getAllSubCategories = async () => {
  const subcategories = await pool.query('SELECT name, id, parent_id, description FROM category WHERE parent_id IS NOT NULL')
  // FIXME:TODO:
  // SHOULD BE:
  // return subcategories.map(cat => new Category(cat.id, cat.parent_id, cat.name, cat.description))
  return subcategories
}

/**
 * Gets a category by its id
 *
 * @param {Number} id
 * @return {Promise<Category>}
 */
productDAO.getCategoryById = async (id) => {
  const selectCategoryByIdQuery = 'SELECT name, id, parent_id, description FROM category WHERE id=?'
  const [category] = await pool.query(selectCategoryByIdQuery, [id])
  return new Category(category.id, category.parent_id, category.name, category.description)
}

/**
 * Get all categories for a specific product.
 *
 * @param {Number} productId
 * @return {*[]}
 */
productDAO.getCategories = async (productId) => {
  const selectQuery =
   `SELECT id, parent_id, name, description
   FROM category AS c
   INNER JOIN product_category AS pc
   ON c.id=pc.category_id
   WHERE pc.product_id=?`
  const categories = []
  const rows = await pool.query(selectQuery, [productId])
  rows.forEach(cat => {
    categories.push(new Category(cat.id, cat.parent_id, cat.name, cat.description))
  })
  return categories
}

/**
 * Get the images belonging to a product.
 * Returns an empty array if no images exist.
 *
 * @param {Number} productId - The associated productid.
 * @return {ProductImage[]}
 * @throws {SqlError} - SqlError|Error
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
 * Gets the tags belonging to a product.
 * Returns an empty array if no tags exist.
 *
 * @param {Number} productId - The associated product id.
 * @return {Tags[]}
 * @throws {SqlError} - SqlError|Error
 */
productDAO.getTags = async (productId) => {
  const tags = []
  const result = await pool.query('SELECT id, name, product_id FROM product_tag WHERE product_id = ?', [productId])
  result.forEach(
    result => tags.push(new ProductTag(result.id, result.name, result.product_id))
  )
  return tags
}

productDAO.search = async (search) => {
  const wildcard = `%${search}%`
  const products = []

  const selectProductsByCategoryName =
  `SELECT product.* FROM product
   INNER JOIN product_category ON product.id = product_category.product_id 
   INNER JOIN category ON product_category.category_id = category.id AND category.name LIKE ?`

  const selectProductsByTagName =
  `SELECT product.* FROM product
   INNER JOIN product_tag ON product.id = product_tag.product_id AND product_tag.name LIKE ?`

  const selectProductsByProductName = 'SELECT * FROM product WHERE name LIKE ?'

  const union = `${selectProductsByCategoryName} UNION ${selectProductsByTagName} UNION ${selectProductsByProductName}`

  const rows = await pool.query(union, [wildcard, wildcard, wildcard])

  await Promise.all(
    rows.map(async (product) => {
      product.categories = await productDAO.getCategories(product.id)
      product.images = await productDAO.getImages(product.id)
      product.tags = await productDAO.getTags(product.id)
      products.push(parseProduct(product))
    })
  )

  return products
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
  return new Product(row.id, row.producer_org_no, row.name, row.description, row.price,
    row.sale_price, row.unit, row.in_stock, row.categories, row.images, row.tags)
}

module.exports = productDAO
