'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    expected_time_of_delivery: DataTypes.DATE,
    status: { type: DataTypes.BOOLEAN, defaultValue: 'pending' },
    confirm_delivery: { type: DataTypes.BOOLEAN, defaultValue: false },
    assignedTo: DataTypes.STRING,
    amount: DataTypes.TEXT,
    addendum: DataTypes.TEXT,
    rate: { type: DataTypes.INTEGER, defaultValue: 0 }
    });
  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Order.hasMany(models.Order, {
      foreignKey: 'menuId',
      as: 'menus',
    });
  }
  return Order;
};

