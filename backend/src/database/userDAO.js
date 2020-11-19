const pool = require('./databaseConnection')

const userDAO = {}

/**
 * Registers a new user
 * 
 * @param {user} user 
 */
userDAO.create = async (user) => {
    let conn;
    try {
        conn = await pool.getConnection();
        conn.query("INSERT INTO user (email, password, full_name, role) VALUES ('" + user.email + "', '" + user.password + "', '" + user.name + "', '" + user.role + "')")
    } catch (error) {
        throw error
    } finally {
        if (conn) conn.release()
    }
}

/**
 * Finds a user by email
 * 
 * @param {string} email
 * @returns {object} user
 */
userDAO.findByEmail = async (email) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let [user] = await conn.query("SELECT * FROM user WHERE email=('" + email + "')")
        return user
    } catch (error) {
        throw error
    } finally {
        if (conn) conn.release()
    }
}

module.exports = userDAO
