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
    
    const userId = await conn.query("INSERT INTO user (email, password, full_name) VALUES ('" + user.email + "', '" + user.password + "', '" + user.name + "')")
    const addressId = await conn.query("INSERT INTO address (street_address, zip, city) VALUES ('" + user.businessAddress.streetAddress + "', '" + user.businessAddress.zip + "', '" + user.businessAddress.city + "')")
    
    conn.query("INSERT INTO user_address (user_id, address_id, type) VALUES ('" + userId.insertId + "', '" + addressId.insertId + "', '" + user.businessAddress.type + "')")
    
    conn.query("INSERT INTO producer (org_no, user_id) VALUES ('" + user.orgNumber + "', '" + userId.insertId + "')")

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
