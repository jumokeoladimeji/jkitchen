const articleController = require('../../server/controllers/article')

module.exports = (app) => {
  app.route('/api/v1/users/:userId/articles')
    .post(articleController.hasAuthorization, articleController.create)
    .get(articleController.list)
  app.route('/api/v1/users/:userId/articles/:articleId')
    .get(articleController.getOne)
    .put(articleController.hasAuthorization, articleController.update)
    .delete(articleController.hasAuthorization, articleController.destroy)
}
