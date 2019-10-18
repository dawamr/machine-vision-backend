'use strict';
module.exports = (sequelize, DataTypes) => {
  const calculator_sensor = sequelize.define('calculator_sensor', {
    formula_id: DataTypes.INTEGER,
    sensor_name: DataTypes.STRING,
    sensor_data: DataTypes.INTEGER
  }, {
    paranoid: true
  });
  calculator_sensor.associate = function(models) {
    // associations can be defined here
  };
  return calculator_sensor;
};