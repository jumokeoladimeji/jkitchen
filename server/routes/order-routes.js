const orderController = require('../../server/controllers/order')

module.exports = (app) => {
  app.route('/api/v1/users/:userId/orders')
    .post(orderController.create)
    .get(orderController.listOrderByUser);
  app.route('/api/v1/users/:userId/admin/orders/pendingOrders')
    .get(orderController.listPendingOrders);
  app.route('/api/v1/users/:userId/admin/orders/unassignedOrders')
    .get(orderController.listUnassignedOrders);
  app.route('/api/v1/users/:userId/admin/orders/listAll')
    .get(orderController.listAll);
  app.route('/api/v1/users/:userId/orders/:orderId')
    .get(orderController.getOne)
    .put(orderController.update)
    .delete(orderController.destroy);
}


