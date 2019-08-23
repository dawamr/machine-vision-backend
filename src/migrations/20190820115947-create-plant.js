'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('plants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      factory_name: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING
      },
      total_sector: {
        type: Sequelize.INTEGER
      },
      total_line: {
        type: Sequelize.INTEGER
      },
      total_team: {
        type: Sequelize.INTEGER
      },
      manufacturing_department: {
        type: Sequelize.BOOLEAN
      },
      engineering_department: {
        type: Sequelize.BOOLEAN
      },
      qc_department: {
        type: Sequelize.BOOLEAN
      },
      warehouse_department: {
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
      queryInterface.addIndex('plants', ['factory_name', 'location', 'latitude', 'longitude', 'created_at', 'deleted_at'])
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('plants');
  }
};