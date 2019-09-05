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
      name: {
        type: Sequelize.STRING
      },
      parameter_category_id: {
        type: Sequelize.INTEGER
      },
      group: {
        type: Sequelize.ENUM('variable','output')
      },
      level: {
        type: Sequelize.ENUM('plant','sector','line','machine')
      },
      type: {
        type: Sequelize.ENUM('constant','initial','manufacture','kpi','predictive')
      },
      configuration: {
        type: Sequelize.JSON
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('parameters');
  }
};