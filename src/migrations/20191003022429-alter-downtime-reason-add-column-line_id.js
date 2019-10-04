'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('downtime_reasons', 'line_id', {
        type: Sequelize.INTEGER,
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('downtime_reasons', 'line_id');
  }
};
