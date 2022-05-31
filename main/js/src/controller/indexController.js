const indexDao = require('../dao/indexDao')

exports.dummy = function (req, res) {
  return res.send('it works')
}

exports.postLogic = function (req, res) {
  const { nickname, gender, address } = req.body
  console.log(nickname, gender, address)
  return res.send(nickname)
}

exports.getUsers = async function (req, res) {
  // 로직
  const token = req.headers['x-access-token']
  console.log(token)

  return res.send({
    result: '',
    isSuccess: true,
    code: 200,
    message: '유저 목록 조회 성공',
  })

  // const userRows = await indexDao.paams()
  // return res.send(userRows)
}
