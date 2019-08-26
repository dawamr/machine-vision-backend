'use strict';
module.exports = (sequelize, DataTypes) => {
  const job_description = sequelize.define('job_description', {
    name: DataTypes.STRING,
    department_id: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  job_description.associate = function(models)  {
    job_description.belongsTo(models.department, { 
      foreignKey: 'department_id' 
    });
    job_description.hasMany(models.user, { 
      foreignKey: 'job_description_id'
    });
  };
  return job_description;
};