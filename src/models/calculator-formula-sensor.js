'use strict';
module.exports = (sequelize, DataTypes) => {
  const calculator_formula_sensor = sequelize.define('calculator_formula_sensor', {
    formula_id: DataTypes.INTEGER,
    sensor_id: DataTypes.INTEGER,
    sensor_label: DataTypes.STRING
  }, {
    paranoid: true
  });
  calculator_formula_sensor.associate = function(models) {
    // associations can be defined here
  };
  return calculator_formula_sensor;
};