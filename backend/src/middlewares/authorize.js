const authorize = {}

authorize.ownerOfProduct = async (req, res, next) => {
  console.log('Authorize user here!')
  console.log(req.body)
  next()
}

module.exports = authorize
