const service = require('../services/productService')
const createError = require('http-errors')
const Product = require('../models/product/product')
const ProductImage = require('../models/product/productimage')

const controller = {}

controller.create = async (req, res, next) => {
  if (req.user.role !== 'producer') {
    return next(createError(403, 'Bara producenter får skapa produkter.'))
  }
  try {
    const product = parseProduct({ ...req.body, orgNumber: req.user.orgNumber, id: null })
    const files = req.files

    await service.create(product, files)
    res.status(200).json({ success: true, message: 'Product added!' })
  } catch (error) {
    return next(error)
  }
}

controller.update = async (req, res, next) => {
  if (req.user.role !== 'producer') {
    return next(createError(403, 'Bara producenter får uppdatera produkter.'))
  }
  try {
    const productId = req.params.id
    const images = req.files.map((file) => new ProductImage(null, null, file.filename, file.originalname))
    const product = parseProduct({ ...req.body, id: productId, orgNumber: req.user.orgNumber, images: images })

    // TODO: Where to get images to delete?
    await service.update(product)
    res.status(200).json({ success: true, message: 'Product updated!' })
  } catch (error) {
    return next(error)
  }
}

controller.delete = async (req, res, next) => {
  if (req.user.role !== 'producer') {
    return next(createError(403, 'Bara producenter får radera produkter.'))
  }
  try {
    const id = req.params.id

    await service.delete(id)
    res.status(200).json({ success: true, message: 'Product deleted!' })
  } catch (error) {
    return next(error)
  }
}

controller.get = async (req, res, next) => {
  try {
    const id = req.params.id

    const result = await service.get(id)

    if (result) {
      res.status(200).json(result)
    } else {
      throw createError(400, 'Product does not exist')
    }
  } catch (error) {
    return next(error)
  }
}

controller.getAll = async (req, res, next) => {
  try {
    const result = await service.getAll()
    res.status(200).json(result)
  } catch (error) {
    return next(error)
  }
}

controller.getAllFromProducer = async (req, res, next) => {
  try {
    const orgNumber = req.params.orgNumber

    const result = await service.getAllFromProducer(orgNumber)
    res.status(200).json(result)
  } catch (error) {
    return next(error)
  }
}

controller.getAllFromCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId

    const result = await service.getAllFromCategory(categoryId)
    res.status(200).json(result)
  } catch (error) {
    return next(error)
  }
}

controller.getAllByName = async (req, res, next) => {
  try {
    const name = req.query.q

    console.log(req.query)

    const result = await service.getAllByName(name)
    res.status(200).json(result)
  } catch (error) {
    return next(error)
  }
}

controller.getAllCategories = async (req, res, next) => {
  try {
    const result = await service.getAllCategories()
    res.status(200).json(result)
  } catch (error) {
    return next(error)
  }
}

/**
 * Parses and returns a Product
 *
 * @param {Object} object
 * @returns {Product} product
 */
const parseProduct = (object) => {
  return new Product(
    object.id,
    object.orgNumber,
    object.name,
    object.description,
    object.price,
    object.salePrice,
    object.unit,
    object.inStock,
    object.categories,
    object.images,
    object.tags
  )
}

module.exports = controller
