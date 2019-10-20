'use strict';
module.exports = (sequelize, DataTypes) => {
  const calculator_runner_log = sequelize.define('calculator_runner_log', {
    runner_id: DataTypes.INTEGER,
    logs: DataTypes.TEXT
  }, {});
  calculator_runner_log.associate = function(models) {
    // associations can be defined here
    calculator_runner_log.belongsTo(models.calculator_runner, {foreignKey: "runner_id", as: 'runner'})
  };
  return calculator_runner_log;
};