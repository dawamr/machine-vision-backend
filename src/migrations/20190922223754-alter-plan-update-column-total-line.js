'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('plants', 'total_line', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue : 0,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('plants', 'total_line', {
      type: Sequelize.INTEGER,
    });
  }
};
