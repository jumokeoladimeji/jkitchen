const articleController = require('../../server/controllers/article')

module.exports = (app) => {
  app.route('/api/users/:userId/articles').post(articleController.create)
    .get(articleController.list);
  app.route('/api/users/:userId/articles/:articleId')
    .get(articleController.getOne)
    .put(articleController.update)
    .delete(articleController.destroy);
}


