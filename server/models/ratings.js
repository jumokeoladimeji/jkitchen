'use strict'
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    ratings: DataTypes.INTEGER
  })
  Rating.associate = (models) => {
    Rating.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
    Rating.belongsTo(models.Meal, {
      foreignKey: 'mealId',
      onDelete: 'CASCADE'
    })
  }
  return Rating
}
