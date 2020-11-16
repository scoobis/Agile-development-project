// NOTE: Only example, remove later
const controller = {}

const service = require('../services/exampleService')

controller.test = async (req, res, next) => {
    try {
        res.send(service.test());
    } catch (err) { next(err) }
}

module.exports = controller