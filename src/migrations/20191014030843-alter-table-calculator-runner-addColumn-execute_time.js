'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('calculator_runners', 'execute_time', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('calculator_runners', 'execute_time', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  }
};
