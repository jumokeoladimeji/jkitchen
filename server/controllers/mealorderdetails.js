// const MealOrderDetails = require('../models').MealOrderDetails,
//   Order = require('../models').Order,
//   Meal = require('../models').Meal;

// module.exports = {
//   create: (req, res) => {
//     return MealOrderDetails
//       .create({
//         quantity: req.body.quantity,
//         mealId: req.params.mealId,
//         orderId: req.params.orderId,
//       })
//       .then(Order => res.status(201).send(Order))
//       .catch(error => res.status(400).send(error));
//   }
// }

// // create: (req, res) => {
// //     return Order
// //       .create({
// //         expectedTimeOfDelivery: req.body.expectedTimeOfDelivery,
// //         userId: req.params.userId,
// //         amount: req.body.amount,
// //         extraNotes: req.body.extraNotes,
// //       })
// //       .then(Order => res.status(201).send(Order))
// //       .catch(error => res.status(400).send(error));
// //   },

//   // create: (req, res) => {
//   //   console.log(req.body)
//   //   return Meal
//   //     .create({
//   //       title: req.body.title,
//   //       price: req.body.price,
//   //       available_quantity: req.body.available_quantity,
//   //       image: req.body.image,
//   //       description: req.body.description,
//   //     })
//   //     .then((meal) => res.status(201).send(meal))
//   //     .catch((error) => res.status(500).send(error));
//   // },
