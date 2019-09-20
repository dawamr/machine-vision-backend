'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('process_machines', 'from_machine_id', {
        type: Sequelize.INTEGER,
        references :{
          model: 'machines',
          key: 'id'
        }
      })
      .then(() => {
        queryInterface.addIndex('process_machines', ['from_machine_id'], {
          name: 'process_machines_idx_from_machine_id',
        })
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('process_machines', 'from_machine_id')
      .then(() => {
        queryInterface.removeIndex('process_machines', 'process_machines_idx_from_machine_id')
      });
  }
};
