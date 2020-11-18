const pool = require('./databaseConnection')

const userDAO = {}

userDAO.registerUser = async (user) => {
    let conn;
    conn = await pool.getConnection();

    conn.query("INSERT INTO user (email, password, full_name, role) VALUES ('" + user.email + "', '" + user.password + "', '" + user.name + "', '" + user.role + "')");
    conn.close();
}

module.exports = userDAO