'use strict';
module.exports = (sequelize, DataTypes) => {
  const plant = sequelize.define('plant', {
    factory_name: DataTypes.STRING,
    location: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    logo: DataTypes.STRING,
    total_sector: DataTypes.INTEGER,
    total_line: DataTypes.INTEGER,
    total_team: DataTypes.INTEGER,
    manufacturing_department: DataTypes.BOOLEAN,
    engineering_department: DataTypes.BOOLEAN,
    qc_department: DataTypes.BOOLEAN,
    warehouse_department: DataTypes.BOOLEAN,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  plant.associate = function(models) {
    // plant.hasMany(models.sector,{foreignKey:'plant_id'});
    // plant.hasMany(models.line,{foreignKey: 'plant_id'});
    // plant.hasMany(models.team, {foreignKey: 'plant_id'});
  };
  return plant;
};