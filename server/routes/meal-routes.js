const mealController = require('../../server/controllers/meal')

module.exports = (app) => {
  app.route('/api/meals') 
    .post(mealController.create)
    .get(mealController.list);
  app.route('/api/meals/:mealId') 
    .get(mealController.getOne)
    .put(mealController.update)
    .delete(mealController.destroy);
  app.route('/api/popularMeals')
    .get(mealController.getMostPopularMeals);
}


