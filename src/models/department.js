'use strict';
module.exports = (sequelize, DataTypes) => {
  const department = sequelize.define('department', {
    name: DataTypes.STRING
  }, {
    underscored: true,
    paranoid: true
  });
    department.associate = function(models) {
      department.hasMany(models.job_description, { foreignKey: 'department_id' });
      department.hasMany(models.user, { foreignKey: 'department_id'});
    };

    return department;
  }
  