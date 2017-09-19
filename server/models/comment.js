'use strict'
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT
  })
  Comment.associate = (models) => {
    Comment.belongsTo(models.Meal, {
      foreignKey: 'mealId',
      onDelete: 'CASCADE'
    })
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
  }
  return Comment
}
