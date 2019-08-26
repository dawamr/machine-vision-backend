'use strict';
module.exports = (sequelize, DataTypes) => {
  const parameters = sequelize.define('parameters', {
    name: DataTypes.STRING,
    parameter_category_id: DataTypes.INTEGER,
    group: DataTypes.ENUM('variable','output'),
    level: DataTypes.ENUM('plant','sector','line','machine'),
    type: DataTypes.ENUM('constant','initial','manufacture','kpi','predictive'),
    alarm_configuration: DataTypes.JSON,
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
  };
  return parameters;
};