'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id:'e639f250-c8d4-11e9-9c98-b5fcc67f4dee',
      name : 'implementor',
      username : 'implementor',
      password : '$2a$10$sFLWh6YRBi7FpYeTWkh3Zu/QHy/1QwzRKT31QukNvDeSFEMl1QdNu',
      created_at : new Date(),
      updated_at : new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', [{
      name :'implementor'
    }])
  }
  };
