'use strict';
module.exports = (sequelize, DataTypes) => {
  const parameters = sequelize.define('parameters', {
    name: DataTypes.STRING,
    parameter_category_id: DataTypes.INTEGER,
    group: DataTypes.ENUM('variable','output'),
    level: DataTypes.ENUM('plant','sector','line','machine'),
    type: DataTypes.STRING,
    data_class: DataTypes.STRING,
    configuration: DataTypes.JSON,
    deletedAt: DataTypes.DATE
}, {
    paranoid: true
  });
  parameters.associate = function(models) {
    // associations can be defined here
    parameters.belongsTo(models.parameter_categories,{
      foreignKey : 'parameter_category_id',
      as :'parameter_category'
    })
    parameters.hasMany(models.calculator_runner_result, {as: 'runner_result'})
    parameters.hasMany(models.calculator_formula_parameter, {as: 'formula_parameter'})
  };
  return parameters;
};