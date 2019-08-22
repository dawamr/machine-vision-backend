'use strict';
module.exports = (sequelize, DataTypes) => {
  const parameters = sequelize.define('parameters', {
    parameter_category_id: DataTypes.INTEGER,
    group: DataTypes.ENUM,
    type: DataTypes.ENUM,
    level: DataTypes.ENUM,
    alarm_configuration: DataTypes.JSON,
    configuration: DataTypes.JSON
  }, {
    paranoid : true
  });
  parameters.associate = function(models) {
    // associations can be defined here
    parameters.belongsTo(parameter_category_id,{
      foreignKey : 'parameter_category_id',
      as :'parameter_category_id'
    })
  };
  return parameters;
};