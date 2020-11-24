const service = require('../services/userService')
const createError = require('http-errors')

const controller = {}

controller.test = async (req, res, next) => {
  try {
    //startsidan
  } catch (err) { next(err) }
}

controller.create = async (req, res, next) => {
  const { name, email, password } = req.body


  if (!name && !email && !password) {
    const error = createError(400, 'No parameters entered!')
    return next(error)
  }

  const isValidPassword = service.isValidPassword(password)
  const isValidName = service.isValidName(name)
  const isValidEmail = service.isValidEmail(email)
  const isAlreadyRegistered = service.isAlreadyRegistered(email)

  if (!isValidPassword) {
    const error = createError(400, 'Password needs to be at least 6 characters long!')
    return next(error)
  } else if (!isValidName) {
    const error = createError(400, 'Name needs to be at least 3 characters long!')
    return next(error)
  } else if (!isValidEmail) {
    const error = createError(400, 'Not a valid email address!')
    return next(error)
  } else if (await isAlreadyRegistered) {
    const error = createError(400, 'Email already exists')
    return next(error)
  } else {
    try {
      service.create(req)
      res.status(200).json({ 'success': true, 'message' : 'Account created!'})
    } catch (error) {
      return next(error)
    }
  }
}

controller.login = async (req, res, next) => { 
  const user = await service.login(req.body)
  console.log(user.email)
}


module.exports = controller
