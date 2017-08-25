const Order = require('../models').Order,
  Menu = require('../models').Menu;

module.exports = {
  create: (req, res) => {
    return Order
      .create({
        expected_time_of_delivery: req.body.expected_time_of_delivery,
        userId: req.params.userId,
        amount: req.body.amount,
        addendum: req.body.addendum,
      })
      .then(Order => res.status(201).send(Order))
      .catch(error => res.status(400).send(error));
  },
  // TODO: List all orders by all users so admin and support person can view orders
  // A user can only view his order
  // list orders that are pending so support person can view 
  // and assign to someone for delivery
  listOrderByUser: (req, res) => {
    return Order
      .findAll({
        where: {
          id: req.params.orderId,
          userId: req.params.userId,
        },
        include: [{
          model: Menu,
          as: 'menus',
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Menu, as: 'menus' }, 'createdAt', 'ASC'],
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
        },
        include: [{
          model: Menu,
          as: 'menus',
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Menu, as: 'menus' }, 'createdAt', 'ASC'],
        ],
      })
      .then((order) => res.status(200).send(order))
      .catch((error) => res.status(400).send(error));
  },
  listAll: (req, res) => {
    return Order
      .findAll({
        include: [{
          model: Menu,
          as: 'menus',
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Menu, as: 'menus' }, 'createdAt', 'ASC'],
        ],
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
        },include: [{
          model: Menu,
          as: 'menus',
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Menu, as: 'menus' }, 'createdAt', 'ASC'],
        ],
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
  update: (req, res) => {
    return Order
      .find({
        where: {
          id: req.params.OrderId,
          userId: req.params.userId,
        },
        include: [{
          model: Menu,
          as: 'menus',
        }],
      })
      .then(order => {
        if (!order) {
          return res.status(404).send({
            message: 'Order Not Found',
          });
        }

        return Order
          .update({
            expected_time_of_delivery: req.body.expected_time_of_delivery || Order.expected_time_of_delivery,
            status: req.body.status || Order.status,
            confirm_delivery: req.body.confirm_delivery || Order.confirm_delivery,
            assignedTo: req.body.assignedTo || Order.assignedTo,
            amount: req.body.amount || Order.amount,
            addendum: req.body.addendum || Order.addendum,
            rate: req.body.rate || Order.rate,
          })
          .then(updatedOrder => res.status(200).send(updatedOrder))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  destroy: (req, res) => {
    return Order
      .find({
        where: {
          id: req.params.OrderId,
          userId: req.params.userId,
        },
      })
      .then(Order => {
        if (!Order) {
          return res.status(404).send({
            message: 'Order Not Found',
          });
        }

        return Order
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
