'use strict';
module.exports = (sequelize, DataTypes) => {
  const jobDescription = sequelize.define('job_description', {
    name: DataTypes.STRING,
    department_id: DataTypes.INTEGER
  },  {
    classMethods: {
      associate: (models) => {
        jobDescription.belongsTo(models.Department,{ foreign_key: 'department_id' });
        jobDescription.hasMany(models.User, { foreign_key: 'job_description_id'});
      }
    },
    underscored: true,
    paranoid: true
  });
  return jobDescription;
};