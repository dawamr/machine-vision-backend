'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('parameters', 'data_class', {
        type: Sequelize.STRING,
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('parameters', 'data_class');
  }
};
