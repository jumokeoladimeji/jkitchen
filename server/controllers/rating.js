const Rating = require('../models').Rating
// const mealController = require('../../server/controllers/meal')
const Meal = require('../models').Meal
const redis = require('redis');
let client
if (process.env.REDIS_URL) {
  client = redis.createClient(process.env.REDIS_URL, {no_ready_check: true});
} else {
  client = redis.createClient();
}
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
const updateOrCreateRatings = (mealId, userId, ratings) => {
  Rating.find({ where: { mealId: mealId, userId } })
    .then(rating => {
      if (!rating) {
      //create rating
        Rating.create({
          userId: userId,
          mealId: mealId,
          ratings: ratings
        }).then((newRate) => {
          return newRate
        })
      } else {
        // update existing rating
        rating.update({
          ratings: ratings
        })
        .then((updatedRating) => {
          return updatedRating
        })
      }
    })
}
module.exports = {
  rateMeal (req, res) {

    const mealId = req.params.mealId
    const ratings = req.body.ratings
    const userId = req.params.userId
    // check if user has rated before and update
    //  const createdOrUpdatedRating = updateOrCreateRatings(mealId, userId, ratings)
    Rating.find({ where: { mealId: mealId, userId } })
      .then(rating => {
        if (!rating) {
        //create rating
          Rating.create({
            userId: userId,
            mealId: mealId,
            ratings: ratings
          }).then((newRate) => {
            updateMeal(newRate, mealId)
            res.status(200).send(newRate)
          })
        } else {
          // update existing rating
          rating.update({
            ratings: ratings
          })
          .then((updatedRating) => {
            updateMeal(updatedRating, mealId)
            res.status(200).send(updatedRating)
          })
        }
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
