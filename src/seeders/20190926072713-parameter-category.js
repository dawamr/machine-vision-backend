'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('parameter_categories', [
      {
        name: "Parameter Category 1",
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        name: "Parameter Category 2",
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        name: "Parameter Category 3",
        createdAt : new Date(),
        updatedAt : new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('parameter_categories')
  }
};
