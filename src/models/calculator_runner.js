'use strict';
module.exports = (sequelize, DataTypes) => {
  const calculator_runner = sequelize.define('calculator_runner', {
    formula_id: DataTypes.INTEGER,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    execute_time: DataTypes.INTEGER,
    formula_xml: DataTypes.TEXT,
    formula_script: DataTypes.TEXT
  }, {
    paranoid: true
  });
  calculator_runner.associate = function(models) {
    // associations can be defined here
    calculator_runner.belongsTo(models.calculator_formula, {foreignKey: "formula_id", as: 'formula'})
    calculator_runner.hasMany(models.calculator_formula_sensor, {as: 'formula_sensor'})
    calculator_runner.hasMany(models.calculator_runner_log, {as: 'sensor_log'})
  };
  return calculator_runner;
};