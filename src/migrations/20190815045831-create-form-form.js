'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('form_forms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sub_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references :{
          model: 'form_sub_categories',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING
      },
      types: {
        type: Sequelize.ENUM(['widget', 'non-widget'])
      },
      is_template: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    }); 
  },
   
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('form_forms');
  }
};