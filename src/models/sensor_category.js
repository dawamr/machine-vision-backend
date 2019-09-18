'use strict';
module.exports = (sequelize, DataTypes) => {
  const sensor_category = sequelize.define('sensor_category', {
    name: DataTypes.STRING,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  sensor_category.associate = function(models) {
    sensor_category.hasMany(models.sensor, {
      foreignKey: 'sensor_category_id'
    });
  };
  return sensor_category;
};