'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('form_fields', [
      {
        form_id: 1,
        types: 'short_text',
        configuration: '{"title":"Nama Lengkap"}',
        is_required: true,
        order : 1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        form_id: 1,
        types: 'long_text',
        configuration: '{"title":"Alamat Lengkap"}',
        is_required: true,
        order : 2,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        form_id: 2,
        types: 'short_text',
        configuration: '{"title":"Nama Lengkap"}',
        is_required: true,
        order : 1,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        form_id: 2,
        types: 'long_text',
        configuration: '{"title":"Alamat Lengkap"}',
        is_required: true,
        order : 2,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('form_fields')
  }
};
