const indexController = require('../controller/indexController')

exports.indexRouter = function (app) {
  app.get('/users', indexController.getUsers)
  app.post('/user', indexController.postLogic)
}
