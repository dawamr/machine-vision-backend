'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('calculator_runner_results', [
      {
        parameter_id:1,
        parameter_name: "OEE",
        value: 12,
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('calculator_runner_results')
  }
};
