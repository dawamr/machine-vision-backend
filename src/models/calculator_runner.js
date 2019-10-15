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
  };
  return calculator_runner;
};