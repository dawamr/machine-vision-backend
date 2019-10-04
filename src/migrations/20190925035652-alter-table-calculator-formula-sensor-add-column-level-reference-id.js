'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('calculator_formula_sensors', 'level_reference_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('calculator_formula_sensors', 'level_reference_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
  }
};
