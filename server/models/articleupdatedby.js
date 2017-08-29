'use strict';
module.exports = function(sequelize, DataTypes) {
  const ArticleUpdatedBy = sequelize.define('ArticleUpdatedBy');
  ArticleUpdatedBy.associate = (models) => {
    ArticleUpdatedBy.belongsTo(models.Article, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
    });
    ArticleUpdatedBy.belongsTo(models.User, {
      foreignKey: 'updatedBy',
      onDelete: 'CASCADE',
    });

  }
  return ArticleUpdatedBy;
};

