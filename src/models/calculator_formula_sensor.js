'use strict';
module.exports = (sequelize, DataTypes) => {
  const calculator_formula_sensor = sequelize.define('calculator_formula_sensor', {
    level: DataTypes.ENUM('plant', 'sector', 'line', 'machine'),
    level_reference_id: DataTypes.ENUM('plant', 'sector', 'line', 'machine'),
    label: DataTypes.STRING
  }, {
    paranoid: true
  });
  calculator_formula_sensor.associate = function(models) {
    // associations can be defined here
  };
  return calculator_formula_sensor;
};