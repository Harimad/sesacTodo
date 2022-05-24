const indexController = require('../controller/indexController')

exports.indexRouter = function (app) {
  app.get('/', indexController.dummy)
  app.post('/user', indexController.postLogic)
}
