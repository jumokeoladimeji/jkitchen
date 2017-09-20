const rateController = require('../../server/controllers/rating')

module.exports = (app) => {
  app.post('/api/v1/users/:userId/meals/:mealId/ratings', rateController.rateMeal);
  // app.get('/api/v1/:userId/:mealId/ratings/:rateId', rateController.getRate);
  // app.put('/api/v1/:userId/:mealId/ratings/:rateId', rateController.updateRate);
  // app.delete('/api/v1/:userId/:mealId/ratings/:rateId', rateController.destroy);
}
