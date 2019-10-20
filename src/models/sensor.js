'use strict';
module.exports = (sequelize, DataTypes) => {
  const sensor = sequelize.define('sensor', {
    name: DataTypes.STRING,
    sensor_category_id: DataTypes.INTEGER,
    last_data: DataTypes.INTEGER,
    heartbeat: DataTypes.STRING,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  sensor.associate = function(models) {
    sensor.belongsTo(models.sensor_category, {
      foreignKey: 'sensor_category_id'
    });
    sensor.hasMany(models.calculator_formula_sensor, { as: 'formula_sensor' })
  };
  return sensor;
};