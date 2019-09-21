'use strict';
module.exports = (sequelize, DataTypes) => {
  const calculator_runner_result = sequelize.define('calculator_runner_result', {
    parameter_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    value: DataTypes.INTEGER
  }, {
    paranoid: true
  });
  calculator_runner_result.associate = function(models) {
    // associations can be defined here
    calculator_runner_result.belongsTo(models.parameters, {foreignKey: "parameter_id", as: 'parameter'})
  };
  return calculator_runner_result;
};