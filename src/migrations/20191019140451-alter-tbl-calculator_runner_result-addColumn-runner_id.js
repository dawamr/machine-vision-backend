'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('calculator_runner_result', 'runner_id', {
      type: Sequelize.INTEGER,
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('calculator_runner_result', 'runner_id');
  }
};
