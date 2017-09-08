const mealController = require('../../server/controllers/meal')

module.exports = (app) => {
  app.post('/api/meals', mealController.create);
  app.get('/api/meals', mealController.list);
  app.get('/api/meals/:mealId', mealController.getOne);
  app.put('/api/meals/:mealId', mealController.update);
  app.delete('/api/meals/:mealId', mealController.destroy);
}

