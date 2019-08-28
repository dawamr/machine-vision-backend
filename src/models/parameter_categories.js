'use strict';
module.exports = (sequelize, DataTypes) => {
  const parameter_categories = sequelize.define('parameter_categories', {
    name: DataTypes.STRING
  }, {
    paranoid: true
  });
  parameter_categories.associate = function(models) {
    // associations can be defined here
    parameter_categories.hasMany(models.parameters, {as: 'parameter'})
  };
  return parameter_categories;
};