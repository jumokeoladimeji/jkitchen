'use strict'

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    expectedTimeOfDelivery: DataTypes.DATE,
    status: { type: DataTypes.STRING, defaultValue: 'pending' },
    confirmDelivery: { type: DataTypes.BOOLEAN, defaultValue: false },
    assignedTo: DataTypes.STRING,
    amount: DataTypes.TEXT,
    extraNotes: DataTypes.TEXT,
    rate: { type: DataTypes.INTEGER, defaultValue: 0 }
  })

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
    Order.hasMany(models.MealOrderDetail, {
      foreignKey: 'orderId',
      as: 'mealOrderDetails'
    })
  }
  return Order
}
