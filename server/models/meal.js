'use strict'
module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    title: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    available_quantity: DataTypes.INTEGER,
    image: DataTypes.STRING,
    description: DataTypes.TEXT
  })
  Meal.associate = (models) => {
    Meal.hasMany(models.MealOrderDetail, {
      foreignKey: 'mealId',
      as: 'mealOrderDetails'
    })
    Meal.hasMany(models.Rating, {
      foreignKey: 'mealId',
      as: 'ratings'
    })
    Meal.hasMany(models.Comment, {
      foreignKey: 'mealId',
      as: 'comments'
    })
  }
  return Meal
}
