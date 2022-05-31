const indexController = require('../controller/indexController')

exports.indexRouter = function (app) {
  app.get('/users/:userIdx', indexController.getUsers)
  app.post('/user', indexController.postLogic)
}
