'use strict';
module.exports = (sequelize, DataTypes) => {
  const Departement = sequelize.define('departement', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        Departement.hasMany(models.jobDescription, { foreign_key: 'job_description_id' });
      }
    },
    underscored: true,
    paranoid: true
  });
  return Departement;
};