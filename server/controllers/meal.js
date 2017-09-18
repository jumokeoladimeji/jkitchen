const Meal = require('../models').Meal;
const Rating = require('../models').Rating;
const Comment = require('../models').Comment;
const MealOrderDetail = require('../models').MealOrderDetail

module.exports = {
  // Only admin can create and update meal
  create: (req, res) => {
    return Meal
      .create({
        title: req.body.title,
        price: req.body.price,
        available_quantity: req.body.available_quantity,
        image: req.body.image,
        description: req.body.description,
      })
      .then((meal) => res.status(200).send(meal))
      .catch((error) => {
        res.status(500).send(error)
      });
  },

  list: (req, res) => {
    return Meal
      .findAll({
      include: [
        {
          model: Rating,
           as: 'ratings'
        }
      ]})
      .then((meals) => res.status(200).send(meals))
      .catch((error) => {
        res.status(500).send(error)
      });
  },

  getOne: (req, res) => {
   mealId = req.params.mealId
    // get meal from redis cache
    client.get(`meal${mealId}`, function(err, reply) {
      if(reply){
        let meal = JSON.parse(reply)
        // create a set in redis for popular meals
        // when count is more than one, add the meal to popular meals
        if (meal.count > 1) {
          client.sadd('mostPopularMeals', reply)
        }
        else{
          meal.count++
        }
        return res.status(200).send(meal)
      }
      else{
        return Meal
          .findById(req.params.mealId, {
            include: [{
              model: Rating,
              as: 'ratings',
            },{
              model: Comment,
              as: 'comments'
            }, {
              model: MealOrderDetail,
              as: 'mealOrderDetails'
            }]
          })
          .then(meal => {
            if (!meal) {
              return res.status(404).send({
                message: 'Meal Not Found',
              });
            }
            let mealToCache = meal.dataValues
            mealToCache.count = 0
            client.set(`meal${mealId}`, JSON.stringify(mealToCache), function(err, reply) {
              return res.status(200).send(meal);
            });
          })
          .catch((error) =>{
            res.status(500).send(error)
          });

      }
    });

  },
  getMostPopularMeals: (req, res) => {

    client.smembers('mostPopularMeals', function(err, reply){
      if(err){
        return res.status(500).send(err)
      } 
      return res.status(200).send(reply);
    });

  },
  update: (req, res) => {
    return Meal
      .findById(req.params.mealId, {
        include: [{
          model: Rating,
          as: 'ratings',
        },{
          model: Comment,
          as: 'comments'
        }, {
          model: MealOrderDetail,
          as: 'mealOrderDetails'
        }]
      })
      .then(meal => {
        if (!meal) {
          return res.status(404).send({
            message: 'Meal Not Found',
          });
        }
        else{
          return meal
            .update({
              title: req.body.title || meal.title,
              price: req.body.price || meal.price,
              available_quantity: req.body.available_quantity || meal.available_quantity,
              image: req.body.image || meal.image,
              description: req.body.description || meal.description,
            })
            .then((updatedMeal) => {
              mealToUpdate = JSON.stringify(meal)
              // delete meal from the mostPopularMeals set
              client.srem('mostPopularMeals', mealToUpdate)
              // add updated meal to the set
              client.sadd('mostPopularMeals', JSON.stringify(updatedMeal))
              res.status(200).send(updatedMeal)
            })
        }
      })
      .catch((error) =>{
        res.status(500).send(error)
      });
  },

  destroy: (req, res) => {
    return Meal
      .findById(req.params.mealId)
      .then(meal => {
        if (!meal) {
          return res.status(500).send({
            message: 'Meal Not Found',
          });
        }
        return meal
          .destroy()
          .then(() => res.status(200).send({message: 'Meal deleted.'}))
      })
      .catch((error) => res.status(500).send(error));
  }
};
