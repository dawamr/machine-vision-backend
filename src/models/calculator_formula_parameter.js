'use strict';
module.exports = (sequelize, DataTypes) => {
  const calculator_formula_parameter = sequelize.define('calculator_formula_parameter', {
    parameter_id: DataTypes.INTEGER,
    formula_id: DataTypes.INTEGER,
  }, {
    paranoid: true
  });
  calculator_formula_parameter.associate = function(models) {
    // associations can be defined here
    calculator_formula_parameter.belongsTo(models.parameters, {foreignKey: "parameter_id", as: 'parameter'})
    calculator_formula_parameter.belongsTo(models.calculator_formula, {foreignKey: "formula_id", as: 'formula'})
  };
  return calculator_formula_parameter;
};