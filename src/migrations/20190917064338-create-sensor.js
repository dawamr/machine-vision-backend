'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sensors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      sensor_category_id: {
        type: Sequelize.INTEGER
      },
      last_data: {
        type: Sequelize.INTEGER
      },
      heartbeat: {
        type: Sequelize.STRING
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
      queryInterface.addIndex('sensors', ['name', 'sensor_category_id', 'created_at', 'deleted_at'])
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sensors');
  }
};