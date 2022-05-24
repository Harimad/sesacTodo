const { pool } = require('../../database')

exports.getUserRows = async function () {
  try {
    const connection = await pool.getConnection(async conn => conn)

    try {
      const selectUserQuery = 'SELECT * FROM Users;'
      const [row] = await connection.query(selectUserQuery)
      connection.release()
      return row
    } catch (err) {
      console.error(` ##### getUserRows Query error ##### `)
      connection.release()
      return false
    }
  } catch (err) {
    console.error(` ##### getUserRows DB error #####`)
    return false
  }
}
