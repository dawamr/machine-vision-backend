'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('machines', 'sensor_total_status', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue : false,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('machines', 'sensor_total_status', {
      type: Sequelize.BOOLEAN,
    });
  }
};
