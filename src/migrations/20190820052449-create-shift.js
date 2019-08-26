'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shifts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      time_start: {
        type: Sequelize.TIME
      },
      time_end: {
        type: Sequelize.TIME
      },
      duration: {
        type: Sequelize.INTEGER
      },
      deleted_at: {
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      queryInterface.addIndex('shifts', ['name', 'created_at', 'deleted_at'])
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('shifts');
  }
};