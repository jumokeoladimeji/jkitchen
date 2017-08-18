'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    expected_time_of_delivery: DataTypes.DATE,
    status: {
      type:   Sequelize.ENUM,
      values: ['pending', 'delivered'],
    },
    confirm_delivery: { type: DataTypes.BOOLEAN, defaultValue: false },
    assignedTo: DataTypes.STRING,
    amount: DataTypes.TEXT,
    addendum: DataTypes.TEXT,
    rate: { type: DataTypes.INTEGER, defaultValue: 0 },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    classMethods: {
      associate: (models) => {
        Order.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Order;
};

