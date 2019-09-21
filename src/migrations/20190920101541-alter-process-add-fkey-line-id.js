'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('processes', ['line_id'], {
      type: 'foreign key',
      name: 'processes_fkey_line_id',
      references: { //Required field
        table: 'lines',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('processes', 'processes_fkey_line_id');
  }
};
