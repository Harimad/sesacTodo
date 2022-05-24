const express = require('express')
const cors = require('cors')
const compression = require('compression')
const app = express()
const port = 3000

// express 미들웨어 설정

// cors 설정
app.use(cors())

// body json 파싱
app.use(express.json())

// HTTP 요청 압축
app.use(compression())

// app.get('/users', function (req, res) {
//   return res.send('hello')
// })

app.post('/user', function (req, res) {
  const name = req.body.name
  return res.send(name)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
