const mealController = require('../../server/controllers/meal')

module.exports = (app) => {
  app.route('/api/v1/meals') 
    .post(mealController.create)
    .get(mealController.list);
  app.route('/api/v1/meals/:mealId')
    .get(mealController.getOne)
    .put(mealController.update)
    .delete(mealController.destroy);
  app.route('/api/v1/popularMeals')
    .get(mealController.getMostPopularMeals);
}
