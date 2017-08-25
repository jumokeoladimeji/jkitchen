const menuController = require('../../server/controllers/menu')

module.exports = (app) => {
  app.post('/api/menu', menuController.create);
  app.get('/api/menu', menuController.list);
  app.get('/api/menu/:menuId', menuController.getOne);
  app.put('/api/menu/:menuId', menuController.update);
  app.delete('/api/menu/:menuId', menuController.destroy);
}

