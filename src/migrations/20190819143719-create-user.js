'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      date_of_birth: {
        type: Sequelize.DATE
      },
      sector_id: {
        type: Sequelize.INTEGER
      },
      line_id: {
        type: Sequelize.INTEGER
      },
      machine_id: {
        type: Sequelize.INTEGER
      },
      team_id: {
        type: Sequelize.INTEGER
      },
      department_id: {
        type: Sequelize.INTEGER
      },
      job_description_id: {
        type: Sequelize.INTEGER
      },
      shift_id: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};