'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('calculator_formulas', 'is_active', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('calculator_formulas', 'is_active', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
  }
};
