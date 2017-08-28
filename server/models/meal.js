'use strict';
module.exports = (sequelize, DataTypes) => {

  const Meal = sequelize.define('Meal', {
    title: { type: DataTypes.STRING, allowNull: false},
    price: { type: DataTypes.STRING, allowNull: false},
    available_quantity: DataTypes.INTEGER,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
  });
  Meal.associate = (models) => {
    Meal.hasMany(models.MealOrderDetail, {
      foreignKey: 'mealId',
      as 'mealOrderDetails'
    });
    Meal.hasMany(models.Rate, {
      foreignKey: 'mealId',
      as: 'rates',
    });
    Meal.hasMany(models.Comment, {
      foreignKey: 'commentId',
      as: 'comments',
    });
  }
  return Meal;
};

