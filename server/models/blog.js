'use strict';

module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    caption: DataTypes.STRING,
    imageURL: DataTypes.STRING
  });
  Blog.associate = (models) => {
    Blog.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  }
  return Blog;
};


