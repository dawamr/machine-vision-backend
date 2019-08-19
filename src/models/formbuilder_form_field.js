'use strict';
module.exports = (sequelize, DataTypes) => {
  const form_field = sequelize.define('form_field', {
    types: DataTypes.STRING,
    congfigurate: DataTypes.JSON,
    is_required: DataTypes.BOOLEAN,
    order: DataTypes.INTEGER
  }, {});
  form_field.associate = function(models) {
    // associations can be defined here
  };
  return form_field;
};