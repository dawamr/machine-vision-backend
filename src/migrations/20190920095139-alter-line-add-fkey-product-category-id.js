'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('lines', ['product_category_id'], {
      type: 'foreign key',
      name: 'lines_fkey_product_category_id',
      references: { //Required field
        table: 'product_categories',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('lines', 'lines_fkey_product_category_id');
  }
};
