'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      expected_time_of_delivery: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      confirm_delivery: {
        type: Sequelize.BOOLEAN
      },
      assignedTo: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.TEXT
      },
      addendum: {
        type: Sequelize.TEXT
      },
      rate: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }, 
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      }
    }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Orders');
};

