'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('form_categories', [
      {
        name: "Category 1",
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        name: "Category 2",
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        name: "Category 3",
        createdAt : new Date(),
        updatedAt : new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('form_categories')
  }
};
