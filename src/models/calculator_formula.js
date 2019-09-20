'use strict';
module.exports = (sequelize, DataTypes) => {
  const calculator_formula = sequelize.define('calculator_formula', {
    name: DataTypes.STRING,
    level: DataTypes.ENUM('plant', 'sector', 'line', 'machine'),
    level_reference_id: DataTypes.ENUM('plant', 'sector', 'line', 'machine'),
    formula_script: DataTypes.TEXT,
    formula_xml: DataTypes.TEXT
  }, {
    paranoid: true
  });
  calculator_formula.associate = function(models) {
    // associations can be defined here
    calculator_formula.hasMany(models.calculator_runner, {as: 'calculator_runner'})
  };
  return calculator_formula;
};