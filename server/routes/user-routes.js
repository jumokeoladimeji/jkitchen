const userController = require('../../server/controllers/userController');

module.exports = (app) => {
  app.post('/api/user/signup', userController.signup);
  app.post('/api/user/signin', userController.signin);
  app.put('/api/user/me/:userId/edit', userController.updateUser);
  app.put('/api/user/signout', userController.signout);
}


