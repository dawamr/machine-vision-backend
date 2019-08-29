'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('machines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      manufacturer: {
        type: Sequelize.STRING
      },
      build_year: {
        type: Sequelize.STRING
      },
      asset_number: {
        type: Sequelize.STRING
      },
      cycle_time: {
        type: Sequelize.STRING
      },
      delta_t_tg: {
        type: Sequelize.STRING
      },
      delta_t_tr: {
        type: Sequelize.STRING
      },
      delta_t_gr: {
        type: Sequelize.STRING
      },
      sensor_total_status: {
        type: Sequelize.BOOLEAN
      },
      sensor_reject_status: {
        type: Sequelize.BOOLEAN
      },
      sensor_good_status: {
        type: Sequelize.BOOLEAN
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
      queryInterface.addIndex('machines', ['name', 'code', 'manufacturer', 'build_year', 'asset_number', 'created_at', 'deleted_at'])
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('machines');
  }
};