'use strict';
module.exports = (sequelize, DataTypes) => {
  const plant = sequelize.define('plant', {
    factory_name: DataTypes.STRING,
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
    // associations can be defined here
  };
  return plant;
};