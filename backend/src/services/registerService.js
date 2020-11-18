const user = require('../model/user')
const userDAO = require('../database/userDAO')

const service = {}

service.registerUser = (req) => {
    const userToRegister = new user(req.body.email, req.body.password, req.body.name, req.body.role)
    userDAO.registerUser(userToRegister)

}

module.exports = service