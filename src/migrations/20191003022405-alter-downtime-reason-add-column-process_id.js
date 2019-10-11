'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('downtime_reasons', 'process_id', {
        type: Sequelize.INTEGER,
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('downtime_reasons', 'process_id');
  }
};
