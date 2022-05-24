const compression = require('compression')
const cors = require('cors')
const { indexRouter } = require('./src/router/indexRouter')

const express = require('express')
const app = express()
const port = 3000

// express 미들웨어 설정 시작

// cors 설정
app.use(cors())

// body json 파싱
app.use(express.json())

// HTTP 요청 압축
app.use(compression())

// express 미들웨어 설정 끝

// 라우터 분리
indexRouter(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
