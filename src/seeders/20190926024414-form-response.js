'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('form_responses', [
      {
        form_id: 1,
        user_id: 'e639f250-c8d4-11e9-9c98-b5fcc67f4dee',
        response: '{"value":"Dawam Raja"}',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        form_id: 1,
        user_id: 'e639f250-c8d4-11e9-9c98-b5fcc67f4dee',
        response: '{"value":"Jl Jalan"}',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        form_id: 2,
        user_id: 'e639f250-c8d4-11e9-9c98-b5fcc67f4dee',
        response: '{"value":"Jack"}',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        form_id: 2,
        user_id: 'e639f250-c8d4-11e9-9c98-b5fcc67f4dee',
        response: '{"value":"Jl Pandanaran II"}',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('form_responses')
  }
};
