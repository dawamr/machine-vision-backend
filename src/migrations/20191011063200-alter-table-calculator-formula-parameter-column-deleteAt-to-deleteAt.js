'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('calculator_formula_parameters', 'deleteAt', 'deletedAt');
  },
  down: (queryInterface, Sequelize) => {
    //
  }
};
