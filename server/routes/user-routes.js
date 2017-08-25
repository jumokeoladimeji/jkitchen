const userController = require('../../server/controllers/userController');

module.exports = (app) => {
  app.post('/api/user/signup', userController.signup);
  app.post('/api/user/signin', userController.signin);
}


