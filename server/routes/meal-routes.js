const mealController = require('../../server/controllers/meal')

module.exports = (app) => {
  console.log('sdmd meal routes')
  app.post('/api/meals', mealController.create);
  app.get('/api/meals', mealController.list);
  app.get('/api/meals/:mealId', mealController.getOne);
  app.put('/api/meals/:mealId', mealController.update);
  app.delete('/api/meals/:mealId', mealController.destroy);
}

