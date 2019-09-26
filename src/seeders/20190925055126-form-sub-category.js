'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('form_sub_categories', [
      {
        name: "Sub Category 1",
        form_category_id :1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        name: "Sub Category 1 A",
        form_category_id :1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        name: "Sub Category 2",
        form_category_id :2,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        name: "Sub Category 3",
        form_category_id :3,
        createdAt : new Date(),
        updatedAt : new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('form_sub_categories')
  }
};
