// NOTE: Only example, remove later
const controller = {}

const service = require('../services/exampleService')

controller.test = async (req, res, next) => {
    try {
        res.send(service.test());
    } catch (err) { next(err) }
}

controller.registerUser = async (req, res, text) => {
    try {
        //Tillfällig logging
        console.log(req.body);
        //Kod för att anropa funktionen som lägger in ny använare i DB.
        res.sendStatus(200);
    }
    catch (err) { next(err) }
  }

module.exports = controller