const pool = require('./databaseConnection')

const orderDAO = {}

orderDAO.order = async (order) => {
  console.log(order)
}
module.exports = orderDAO
