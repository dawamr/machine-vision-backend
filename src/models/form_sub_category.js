'use strict';
module.exports = (sequelize, DataTypes) => {
  const FormSubCategory = sequelize.define('form_sub_category', {
    form_category_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {});
  FormSubCategory.associate = function(models) {
    // associations can be defined here
    // FormSubCategory.hasMany(models.FormForm, {as: 'form'})
  };
  return FormSubCategory;
};