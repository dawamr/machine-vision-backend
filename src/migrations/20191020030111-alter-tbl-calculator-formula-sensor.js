'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('calculator_formula_sensors');
  },

  down: (queryInterface, Sequelize) => {
    
  }
};
