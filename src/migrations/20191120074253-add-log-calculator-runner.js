'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('calculator_runners', 'logs', {
      type: Sequelize.TEXT,
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('calculator_runners', 'logs');
  }
};
