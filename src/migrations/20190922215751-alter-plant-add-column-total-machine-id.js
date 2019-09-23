'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('plants', 'total_machine', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue : 0,
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('plants', 'total_machine');
  }
};
