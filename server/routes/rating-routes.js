const rateController = require('../../server/controllers/rating')

module.exports = (app) => {
  app.post('/api/:userId/:mealId/ratings', rateController.rateMeal);
  // app.get('/api/:userId/:mealId/ratings/:rateId', rateController.getRate);
  // app.put('/api/:userId/:mealId/ratings/:rateId', rateController.updateRate);
  // app.delete('/api/:userId/:mealId/ratings/:rateId', rateController.destroy);
}