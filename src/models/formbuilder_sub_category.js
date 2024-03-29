'use strict';
module.exports = (sequelize, DataTypes) => {
  const FormSubCategory = sequelize.define('form_sub_category', {
    form_category_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    paranoid: true

  });
  FormSubCategory.associate = function(models) {
    // associations can be defined here
    FormSubCategory.belongsTo(models.form_category, {foreignKey: 'form_category_id', as: 'category'})
    
    FormSubCategory.hasMany(models.form_form, {as: 'form'})
  };
  return FormSubCategory;
};