'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('process_machines', ['machine_id'], {
      type: 'foreign key',
      name: 'process_machines_fkey_machine_id',
      references: { //Required field
        table: 'machines',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('process_machines', 'process_machines_fkey_machine_id');
  }
};
