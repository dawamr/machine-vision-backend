'use strict';
module.exports = (sequelize, DataTypes) => {
  const calculator_runner_result = sequelize.define('calculator_runner_result', {
    parameter_id: DataTypes.INTEGER,
    runner_id: DataTypes.INTEGER,
    parameter_name: DataTypes.STRING,
    value: DataTypes.INTEGER
  }, {
    paranoid: true,
    deletedAt: 'deleteAt',
  });
  calculator_runner_result.associate = function(models) {
    // associations can be defined here
    calculator_runner_result.belongsTo(models.parameters, {foreignKey: "parameter_id", as: 'parameter'})
    calculator_runner_result.belongsTo(models.calculator_runner, {foreignKey: "runner_id", as: 'runner'})
  };
  return calculator_runner_result;
};