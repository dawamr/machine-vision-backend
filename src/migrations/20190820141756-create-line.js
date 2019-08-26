'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      sector_id: {
        type: Sequelize.INTEGER
      },
      product_category_id: {
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
      queryInterface.addIndex('lines', ['name', 'sector_id', 'product_category_id', 'created_at', 'deleted_at'])
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('lines');
  }
};