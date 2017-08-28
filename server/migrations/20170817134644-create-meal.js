'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('Meals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
        title: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      available_quantity: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Users')
};
