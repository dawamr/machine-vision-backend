'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('calculator_formula_sensors', 'level_reference_id');
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('calculator_formula_sensors', 'level_reference_id');
  }
};
