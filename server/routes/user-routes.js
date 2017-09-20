const userController = require('../../server/controllers/user');

module.exports = (app) => {
  app.post('/api/v1/user/signup', userController.signup);
  app.post('/api/v1/user/signin', userController.signin);
  app.put('/api/v1/user/me/:userId/edit', userController.updateUser);
  app.put('/api/v1/user/signout', userController.signout);
}
