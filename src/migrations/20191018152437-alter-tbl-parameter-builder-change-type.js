"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    // // queryInterface.removeColumn('parameters', 'type');
    // return queryInterface.addColumn('parameters', 'type', {
    //   type: Sequelize.STRING,
    // });
  },

  down: (queryInterface, Sequelize) => {
    // queryInterface.removeColumn('parameters', 'type');
  }
};
