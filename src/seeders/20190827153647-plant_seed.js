'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('plants', [{
      factory_name: 'Factory',
      location: 'Jakarta',
      latitude: '14.00000',
      longitude: '100.30003',
      logo: 'https://data.df.jpg',
      manufacturing_department: true,
      engineering_department: true,
      qc_department: false,
      warehouse_department: false,
      created_at : new Date(),
      updated_at : new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('plants', [{
      factory_name: 'Factory',
    }]);
  }
};
