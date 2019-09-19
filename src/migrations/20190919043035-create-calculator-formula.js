'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('calculator_formulas  ', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      level: {
        type: Sequelize.ENUM('plant', 'sector', 'line', 'machine')
      },
      level_reference_id: {
        type: Sequelize.ENUM('plant', 'sector', 'line', 'machine')
      },
      formula_script: {
        type: Sequelize.TEXT
      },
      formula_xml: {
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
      deleteAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('calculator_formulas  ');
  }
};