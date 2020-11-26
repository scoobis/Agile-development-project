const service = {}

/**
 * Creates a new product
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
service.create = async (req, res, next) => {  
  const newProduct = new product(
    req.body.name,
    req.body.desc,
    req.body.price,
    req.body.unit,
    req.body.inStock
  )
  
  const categoryId = req.body.categoryId // One or more? Add to product model?

  await productDAO.createCustomer(newProduct, categoryId)
}

module.exports = service
