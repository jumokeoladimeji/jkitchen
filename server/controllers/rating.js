const Rating = require('../models').Rating

module.exports = {
  rateMeal (req, res) {
    return Rating.create({
      userId: req.params.userId,
      mealId: req.params.mealId,
      ratings: req.body.rating
    })
      .then((rate) => res.status(200).send(rate))
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
