const orderController = require('../../server/controllers/order')

module.exports = (app) => {
  app.post('/api/order', orderController.create);
  app.get('/api/order', orderController.listOrderByUser);
  app.get('/api/order', orderController.listPendingOrders);
  app.get('/api/order', orderController.listAll);
  app.get('/api/order/:orderId', orderController.getOne);
  app.put('/api/order/:orderId', orderController.update);
  app.delete('/api/order/:orderId', orderController.destroy);
}

