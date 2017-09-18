const Order = require('../models').Order
const Meal = require('../models').Meal
const MealOrderDetail = require('../models').MealOrderDetail
const lodash = require('lodash');

module.exports = {
  create: (req, res) => {
    return Order
      .create({
        expectedTimeOfDelivery: req.body.expectedTimeOfDelivery,
        userId: req.params.userId,
        amount: req.body.amount,
        extraNotes: req.body.extraNotes
      })
      .then(order => {
        _.map(req.body.mealIds, (mealId) => {
          return MealOrderDetails
            .create({
              quantity: req.body.quantity,
              mealId: req.params.mealId,
              orderId: order.id,
            })
        });
      })
      .then(mealOrderDetails =>{
        res.status(200).send(mealOrderDetails)
      })
      .catch(error => res.status(400).send(error));
  },
  
  listOrderByUser: (req, res) => {
    return Order
      .findAll({
        where: {
          id: req.params.orderId,
          userId: req.params.userId,
        },
        include: [{
          model: MealOrderDetail,
          as: 'mealOrderDetails',
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: MealOrderDetail, as: 'mealOrderDetails' }, 'createdAt', 'ASC'],
        ],
      })
      .then((order) => res.status(200).send(order))
      .catch((error) => res.status(400).send(error));
  },
  listPendingOrders: (req, res) => {
    return Order
      .findAll({
        where: {
          status: 'pending'
        }
        // ,
        // include: [{
        //   model: Meal,
        //   as: 'meals',
        // }],
        // order: [
        //   ['createdAt', 'DESC'],
        //   [{ model: Meal, as: 'meals' }, 'createdAt', 'ASC'],
        // ],
      })
      .then((order) => res.status(200).send(order))
      .catch((error) => res.status(400).send(error));
  },
  listUnassignedOrders: (req, res) => {
    return Order
      .findAll({
        where: {assignedTo: null}
        // include: [{
        //   model: Meal,
        //   as: 'meals',
        // }],
        // order: [
        //   ['createdAt', 'DESC'],
        //   [{ model: Meal, as: 'meals' }, 'createdAt', 'ASC'],
        // ],
      })
      .then((order) => res.status(200).send(order))
      .catch((error) => res.status(400).send(error));
  },
  listAll: (req, res) => {
    return Order
      .findAll({
        // include: [{
        //   model: Meal,
        //   as: 'meals',
        // }],
        // order: [
        //   ['createdAt', 'DESC'],
        //   [{ model: Meal, as: 'meals' }, 'createdAt', 'ASC'],
        // ],
      })
      .then((orders) => res.status(200).send(orders))
      .catch((error) => res.status(400).send(error));
  },
  getOne: (req, res) => {
    return Order
      .find({
        where: {
          id: req.params.orderId,
          userId: req.params.userId,
        }
        // ,include: [{
        //   model: Meal,
        //   as: 'meals',
        // }],
        // order: [
        //   ['createdAt', 'DESC'],
        //   [{ model: Meal, as: 'meals' }, 'createdAt', 'ASC'],
        // ],
      })
      .then(order => {
        if (!order) {
          return res.status(404).send({
            message: 'Order Not Found',
          });
        }
        return res.status(200).send(order)
      })
      .catch(error => res.status(500).send(error));
  },
  // that means the support person assigns orders to a delivery person, 
  // then the system sends an email to he user after delivery to rate
  update: (req, res) => {
    return Order
      .find({
        where: {
          id: req.params.OrderId,
          userId: req.params.userId,
        }
      //   ,
      //   include: [{
      //     model: Meal,
      //     as: 'meals',
      //   }],
      })
      .then(order => {
        if (!order) {
          return res.status(404).send({
            message: 'Order Not Found',
          });
        }

        return Order
          .update({
            expectedTimeOfDelivery: req.body.expectedTimeOfDelivery || Order.expectedTimeOfDelivery,
            status: req.body.status || Order.status,
            confirmDelivery: req.body.confirmDelivery || Order.confirmDelivery,
            assignedTo: req.body.assignedTo || Order.assignedTo,
            amount: req.body.amount || Order.amount,
            extraNotes: req.body.extraNotes || Order.extraNotes,
            rate: req.body.rate || Order.rate,
          })
          .then(updatedOrder => {
            // that means the admin assigns order, then the system send an email to he user to rate

            // admin check if it has been delivered
            // if(updatedOrder.confirmDelivery){
            //   // then send email
            // use nodemailer to send email
            // }
            res.status(200).send(updatedOrder)
          })
      })
      .catch(error => {
        res.status(400).send(error)
      });
  },

  destroy: (req, res) => {
    return Order
      .find({
        where: {
          id: req.params.OrderId,
          userId: req.params.userId,
        },
      })
      .then(order => {
        if (!order) {
          return res.status(404).send({
            message: 'Order Not Found',
          });
        }

        return order
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
