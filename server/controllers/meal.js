const Meal = require('../models').Meal;

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
      .findAll()
      .then((meals) => res.status(200).send(meals))
      .catch((error) => res.status(500).send(error));
  },

  getOne: (req, res) => {
    return Meal
      .findOne({
        where: {id: req.params.mealId}
        // include: [{
        //   model: Rating,
        //   as: 'ratings',
        // },{
        //   model: Comment,
        //   as: 'comments'
        // }],
        // order: [
        //   ['createdAt', 'DESC'],
        //   [{ model: Comment, as: 'comments' }, 'createdAt', 'ASC'],
        // ],
      })
      .then((meal) => {
        if (!meal) {
          return res.status(404).send({
            message: 'Meal Not Found',
          });
        }
        return res.status(200).send(meal);
      })
      .catch((error) =>{
       res.status(500).send(error)
      });
  },

  update: (req, res) => {
    return Meal
      .findById(req.params.mealId)
        // , {
        // include: [{
        //   model: Rating,
        //   as: 'ratings',
        // }
        // ,{
        //   model: Comment,
        //   as: 'comments'
        // }, {
        //   model: MealOrderDetail,
        //   as: 'mealOrderDetail'
        // }],
        // order: [
        //   ['createdAt', 'DESC'],
        //   [{ model: Comment, as: 'comments' }, 'createdAt', 'ASC'],
        // ]})
      .then(meal => {
        if (!meal) {
          return res.status(404).send({
            message: 'Meal Not Found',
          });
        }
        return meal
          .update({
            title: req.body.title || meal.title,
            price: req.body.price || meal.price,
            available_quantity: req.body.available_quantity || meal.available_quantity,
            image: req.body.image || meal.image,
            description: req.body.description || meal.description,
          })
          .then((updatedMeal) => res.status(200).send(updatedMeal))
      })
      .catch((error) => res.status(500).send(error));
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
  },
};
