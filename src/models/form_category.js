'use strict';
module.exports = (sequelize, DataTypes) => {
  const FormCategory = sequelize.define('form_category', {
    name: DataTypes.STRING
  }, {});
  FormCategory.associate = function(models) {
    // associations can be defined here
   
  };
  return FormCategory;
};