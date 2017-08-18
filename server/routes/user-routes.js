const userController = require('../../server/controllers/user-controller')

module.exports = (app) => {
  app.post('/api/user', userController.create);
}
