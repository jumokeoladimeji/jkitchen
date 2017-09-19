'use strict'
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      expectedTimeOfDelivery: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      confirmDelivery: {
        type: Sequelize.BOOLEAN
      },
      assignedTo: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.TEXT
      },
      extraNotes: {
        type: Sequelize.TEXT
      },
      rate: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      }
    }),
  down: (queryInterface) => queryInterface.dropTable('Orders')
}

