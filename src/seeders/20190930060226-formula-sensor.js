'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('calculator_formula_sensors', [
      {
        level : 'plant',
        level_reference_id:1,
        label:'Plant 1',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        level : 'machine',
        level_reference_id:1,
        label:'Machine 1',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        level : 'sector',
        level_reference_id:1,
        label:'Sector 1',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        level : 'line',
        level_reference_id:1,
        label:'Line 1',
        createdAt : new Date(),
        updatedAt : new Date()
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('calculator_formula_sensors')
  }
};
