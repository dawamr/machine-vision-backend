'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('department', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        Department.hasMany(models.jobDescription, { foreign_key: 'department_id' });
        Department.hasMany(models.User, { foreign_key: 'department_id'});
      }
    },
    underscored: true,
    paranoid: true
  });
  return Department;
};