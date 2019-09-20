'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('lines', ['sector_id'], {
      type: 'foreign key',
      name: 'lines_fkey_sector_id',
      references: { //Required field
        table: 'sectors',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('lines', 'lines_fkey_sector_id');
  }
};
