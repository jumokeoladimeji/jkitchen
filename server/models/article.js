'use strict';

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    excerpt: DataTypes.STRING,
    imageURL: DataTypes.STRING
  });
  Article.associate = (models) => {
    Article.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Article.hasMany(models.ArticleUpdatedBy, {
      foreignKey: 'articleId',
      as: 'articleUpdatedBys',
    });
  }
  return Article;
};


