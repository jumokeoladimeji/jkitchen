const Meal = require('../models').Meal;

module.exports = {
  // Only admin can create and update meal
  create: (req, res) => {
    console.log(req.body)
    return Meal
      .create({
        title: req.body.title,
        price: req.body.price,
        available_quantity: req.body.available_quantity,
        image: req.body.image,
        description: req.body.description,
      })
      .then((meal) => res.status(201).send(meal))
      .catch((error) => res.status(500).send(error));
  },

  list: (req, res) => {
    return Meal
      .findAll()
      .then((meals) => res.status(200).send(meals))
      .catch((error) => res.status(500).send(error));
  },

  getOne: (req, res) => {
    return Meal
      .findById(req.params.MealId)
      .then((Meal) => {
        if (!meal) {
          return res.status(404).send({
            message: 'Meal Not Found',
          });
        }
        return res.status(200).send(meal);
      })
      .catch((error) => res.status(500).send(error));
  },

  update: (req, res) => {
    return Meal
      .findById(req.params.MealId)
      .then(meal => {
        if (!meal) {
          return res.status(404).send({
            message: 'Meal Not Found',
          });
        }
        return Meal
          .update({
            title: req.body.title || Meal.title,
            price: req.body.price || Meal.price,
            available_quantity: req.body.available_quantity || Meal.available_quantity,
            image: req.body.image || Meal.image,
            description: req.body.description || Meal.description,
          })
          .then((updatedMeal) => res.status(200).send(updatedMeal))
      })
      .catch((error) => res.status(500).send(error));
  },

  destroy: (req, res) => {
    return Meal
      .findById(req.params.MealId)
      .then(Meal => {
        if (!Meal) {
          return res.status(500).send({
            message: 'Meal Not Found',
          });
        }
        return Meal
          .destroy()
          .then(() => res.status(200).send({message: 'Meal deleted.'}))
      })
      .catch((error) => res.status(500).send(error));
  },
};
