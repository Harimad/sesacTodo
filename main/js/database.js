const mysql = require('mysql2/promise')

exports.pool = mysql.createPool({
  host: 'www.pinggudak.shop',
  user: 'outer',
  port: '3306',
  password: 'tjdwls12!@Z',
  database: `kakaoTalkDB`,
})
