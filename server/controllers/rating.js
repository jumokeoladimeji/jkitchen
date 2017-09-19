const Rating = require('../models').Rating
// const mealController = require('../../server/controllers/meal')
const Meal = require('../models').Meal
const redis = require('redis');
const client = redis.createClient();
const _ = require('lodash');

const updateMeal = (rate, mealId) => {
  Meal
    .findById(mealId, {
      include: [{
        model: Rating,
        as: 'ratings'
      }]
    })
    .then(meal => {
      // remove ratings array
      const mealWithRating = meal.dataValues
      const mealWithoutRating = _.omit(mealWithRating, 'ratings')
      const mealToUpdateInCache = JSON.stringify(mealWithoutRating)
      // delete meal from the mostPopularMeals set 
      client.srem('mostPopularMeals', mealToUpdateInCache)
      // add updated meal to the set
      client.sadd('mostPopularMeals', JSON.stringify(mealWithRating))
      // update meal in redis string
      client.set(`meal${mealId}`, JSON.stringify(mealWithRating))
    })
}
module.exports = {
  rateMeal (req, res) {
    const mealId = req.params.mealId
    const ratings = req.body.ratings
    // check if user has rated before and update
    return Rating.create({
      userId: req.params.userId,
      mealId: mealId,
      ratings: ratings
    })
      .then((rate) => {
        updateMeal(ratings, mealId)
        res.status(200).send(rate)
      })
      .catch((error) => {
        res.status(500).send(error)
      })
  }
  // incrementMealRate(req, res) {
  //   Rating.findById(req.params.rateId)
  //     .then(rate => {
  //       return rate.increment(
  //         'ratings': {by: numberToIncrementBy}
  //       )
  //   })
  //     .then({

  //   })
  // },
  // decrementMealRate(req, res) {
  //   Rating.findById(req.params.rateId)
  //     .then(rate => {
  //       return rate.increment(
  //         'ratings': {by: numberToDecrementBy}
  //       )
  //   })
  //   .then((rate) =>{

  //   })
  // },
  // updateRate(req, res) {
  //   Rating.findById(req.params.rateId)
  //     .then(rate => {
  //       return rate.update({
  //         ratings: req.body.ratings
  //       })
  //     .then((updatedRate) => {
  //       res.status(200)
  //     }) 
  //   })
  //   .catch((error)=>{
  //     res.status(500).send(error)
  //   })
}
