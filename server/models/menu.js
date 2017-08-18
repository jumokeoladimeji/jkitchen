'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    title: { type: DataTypes.STRING, allowNull: false},
    price: { type: DataTypes.STRING, allowNull: false},
    available_quantity: DataTypes.INTEGER,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  }, {
    classMethods: {
      associate: (models) => {
       
      }
    }
  });
  return Menu;
};