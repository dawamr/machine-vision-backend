'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('form_response_fields', [
      {
        form_field_id : 1,
        form_response_id :1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        form_field_id : 2,
        form_response_id :2,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        form_field_id : 3,
        form_response_id :3,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        form_field_id : 4,
        form_response_id :4,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('form_response_fields')
  }
};
