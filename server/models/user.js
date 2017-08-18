'use strict';
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    role: { type: DataTypes.STRING, defaultValue: 'user' },
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    social_media_links: DataTypes.STRING,
    hashedPassword: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Order, {
          foreignKey: 'orderId',
          as: 'orders',
        });
      }
    }
  });
  return User;
};