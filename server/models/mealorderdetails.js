'use strict'
module.exports = (sequelize, DataTypes) => {
  const MealOrderDetail = sequelize.define('MealOrderDetail', {
    quantity: DataTypes.INTEGER
  })
  MealOrderDetail.associate = (models) => {
    MealOrderDetail.belongsTo(models.Order, {
      foreignKey: 'orderId',
      onDelete: 'CASCADE'
    })
    MealOrderDetail.belongsTo(models.Meal, {
      foreignKey: 'mealId',
      onDelete: 'CASCADE'
    })
  }
  return MealOrderDetail
}
