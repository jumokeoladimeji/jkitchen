'use strict'

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    excerpt: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    type: { type: DataTypes.STRING, defaultValue: 'article' } // article or revision
  })
  Article.associate = (models) => {
    Article.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
  }
  return Article
}
