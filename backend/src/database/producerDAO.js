const Producer = require('../models/producer')
const pool = require('./databaseConnection')

// Exported ProducerDAO object
module.exports = {
  list,
  get
}

// Return list of producers
async function list () {
  const query = `
  SELECT u.id, u.email, u.password, u.full_name, u.phone_no, p.org_no, p.description
  FROM producer AS p
  INNER JOIN user AS u
  ON p.user_id=u.id`
  const rows = await pool.query(query)

  return rows.map(row => new Producer(
    row.id,
    row.email,
    row.password,
    row.full_name,
    row.phone_no,
    row.org_no,
    row.description
  ))
}

async function get (orgNo) {
  const query = `SELECT u.id, u.email, u.password, u.full_name, u.phone_no, p.org_no, p.description
  FROM producer AS p
  INNER JOIN user AS u
  ON p.user_id=u.id
  WHERE p.org_no=?`
  const [row] = await pool.query(query, [orgNo])
  return new Producer(
    row.id,
    row.email,
    row.password,
    row.full_name,
    row.phone_no,
    row.org_no,
    row.description
  )
}
