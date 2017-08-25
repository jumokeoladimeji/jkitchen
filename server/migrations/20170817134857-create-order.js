'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Orders', {
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
          model: 'User',
          key: 'id',
          as: 'userId',
        },
    }
  }),
  down: function(queryInterface/* , Sequelize */) {
    return queryInterface.dropTable('Orders');
  }
};