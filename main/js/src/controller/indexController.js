const indexDao = require('../dao/indexDao')

exports.dummy = function (req, res) {
  return res.send('it works')
}

exports.postLogic = function (req, res) {
  const { name } = req.body
  return res.send(name)
}

exports.getUsers = async function (req, res) {
  // 로직
  const userRows = await indexDao.getUserRows()
  return res.send(userRows)
}
