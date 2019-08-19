'use strict';
module.exports = (sequelize, DataTypes) => {
  const FormForm = sequelize.define('form_form', {
    sub_category_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    types:DataTypes.STRING,
    is_template: DataTypes.BOOLEAN
  }, {
    paranoid: true
  });
  FormForm.associate = function(models) {
    // associations can be defined here
    FormForm.belongsTo(models.form_sub_category, {foreignKey: "sub_category_id", as: 'sub_category'})
    FormForm.hasMany(models.form_field, {as: 'form_field'})
  };
  return FormForm;
};