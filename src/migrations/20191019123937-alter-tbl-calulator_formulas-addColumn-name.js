'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('calculator_formulas', 'name', {
      type: Sequelize.STRING,
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('calculator_formulas', 'name');
  }
};
