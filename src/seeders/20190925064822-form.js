'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('form_forms', [
      {
        sub_category_id :1,
        name: "Form Pegawai",
        types: "widget",
        is_template : "true",
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        sub_category_id :1,
        name: "Form Pengunjung",
        types: "widget",
        is_template : "true",
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        sub_category_id :2,
        name: "Form Demo",
        types: "widget",
        is_template : "false",
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        sub_category_id :3,
        name: "Form Agustus",
        types: "widget",
        is_template : "true",
        createdAt : new Date(),
        updatedAt : new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('form_forms')
  }
};
