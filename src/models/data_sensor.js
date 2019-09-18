'use strict';
module.exports = (sequelize, DataTypes) => {
  const data_sensor = sequelize.define('data_sensor', {
    sensor_id: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  data_sensor.associate = function(models) {
    // associations can be defined here
  };
  return data_sensor;
};