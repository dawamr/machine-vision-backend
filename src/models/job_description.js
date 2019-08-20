'use strict';
module.exports = (sequelize, DataTypes) => {
  const jobDescription = sequelize.define('job_description', {
    name: DataTypes.STRING,
    departement_id: DataTypes.INTEGER
  },  {
    classMethods: {
      associate: (models) => {
        jobDescription.belongsTo(models.Departement,{ foreignKey: 'departement_id' })
      }
    },
    underscored: true,
    paranoid: true
  });
  return jobDescription;
};