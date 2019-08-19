'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('form_fields', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      form_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references :{
          model: 'form_forms',
          key: 'id'
        }
      },
      types: {
        type: Sequelize.STRING
      },
      configuration: {
        type: Sequelize.JSON
      },
      is_required: {
        type: Sequelize.BOOLEAN
      },
      order: {
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
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('form_fields');
  }
};