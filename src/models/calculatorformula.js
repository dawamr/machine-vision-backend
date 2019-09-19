'use strict';
module.exports = (sequelize, DataTypes) => {
  const CalculatorFormula = sequelize.define('CalculatorFormula', {
    name: DataTypes.STRING,
    level: DataTypes.ENUM('plant', 'sector', 'line', 'machine'),
    level_reference_id: DataTypes.ENUM('plant', 'sector', 'line', 'machine'),
    formula_script: DataTypes.TEXT,
    formula_xml: DataTypes.TEXT
  }, {
    paranoid: true
  });
  CalculatorFormula.associate = function(models) {
    // associations can be defined here
  };
  return CalculatorFormula;
};