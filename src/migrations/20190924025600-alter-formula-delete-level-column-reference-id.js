'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('calculator_formulas', 'level_reference_id');
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('calculator_formulas', 'level_reference_id');
  }
};
