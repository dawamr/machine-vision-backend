'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('process_machines', ['process_id'], {
      type: 'foreign key',
      name: 'process_machines_fkey_process_id',
      references: { //Required field
        table: 'processes',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('process_machines', 'process_machines_fkey_process_id');
  }
};
