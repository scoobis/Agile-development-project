// NOTE: Only example, remove later
const controller = {}

const service = require('../services/exampleService')
const pool = require('../services/databaseService')

controller.test = async (req, res, next) => {
    try {
        res.send(service.test());
    } catch (err) { next(err) }
}

controller.registerUser = async (req, res, text) => {
    try {
        let conn;
        var name = req.body.name
        var email = req.body.email
        var role = req.body.role
        var password = req.body.password


       conn = await pool.getConnection();
       //Tillfällig kod för att registrera en användare
       conn.query("INSERT INTO user (email, password, full_name, role) VALUES ('" + email + "', '" + password + "', '" + name + "', '" + role + "')");

        res.sendStatus(200);
    }
    catch (err) {  }
  }

module.exports = controller