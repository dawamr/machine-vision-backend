'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('form_forms', 'description', {
      type: Sequelize.STRING,
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('form_forms', 'description');
  }
};
