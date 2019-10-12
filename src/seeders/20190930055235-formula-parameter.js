'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('calculator_formula_parameters', [
      {
        parameter_id:1,
        formula_id:1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        parameter_id:2,
        formula_id:2,
        createdAt : new Date(),
        updatedAt : new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('calculator_formula_parameters')
  }
};
