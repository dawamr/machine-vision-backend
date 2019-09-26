'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('parameters', [
      {
        name: "Parameter 1",
        parameter_category_id : 1,
        group:'variable',
        level: 'machine',
        type: 'constant',
        configuration: '{"constant" : {"value" : 45}}',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        name: "Parameter 2",
        parameter_category_id : 2,
        group:'output',
        level: 'sector',
        type: 'initial',
        configuration: '{"alarm" : {"min_value":15, "max_value":35}}',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        name: "Parameter 3",
        parameter_category_id : 3,
        group:'output',
        level: 'line',
        type: 'kpi',
        configuration: '{"kpi" : "kpi"}',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        name: "Parameter 4",
        parameter_category_id : 3,
        group:'output',
        level: 'plant',
        type: 'manufacture',
        configuration: '{"manufactureData" : null}',
        createdAt : new Date(),
        updatedAt : new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('parameters')
  }
};
