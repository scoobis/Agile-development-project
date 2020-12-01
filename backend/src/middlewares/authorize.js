const authorize = {}

authorize.ownerOfProduct = async (req, res, next) => {
  console.log('Authorize user here!')
  next()
}

module.exports = authorize
