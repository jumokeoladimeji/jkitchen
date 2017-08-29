'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rate = sequelize.define('Rate', {
    ratings: DataTypes.INTEGER
  });
  Rate.associate = (models) => {
    Rate.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Rate.belongsTo(models.Meal, {
      foreignKey: 'mealId',
      onDelete: 'CASCADE',
    });
  }
  return Rate;
};