'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('parameters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      parameter_category_id: {
        type: Sequelize.INTEGER
      },
      group: {
        type: Sequelize.ENUM, 
        values: ['variable','output']
      },
      type: {
        type: Sequelize.ENUM, 
        values: ['constant','initial','manufacture','kpi','predictive']
      },
      level: {
        type: Sequelize.ENUM, 
        values: ['plant','sector','line','machine']
      },
      alarm_configuration: {
        type: Sequelize.JSON
      },
      configuration: {
        type: Sequelize.JSON
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('parameters');
  }
};