'use strict';
module.exports = (sequelize, DataTypes) => {
  const FormForm = sequelize.define('form_form', {
    sub_category_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    type: DataTypes.ENUM('widget', 'non-widget'),
    is_template: DataTypes.BOOLEAN
  }, {});
  FormForm.associate = function(models) {
    // associations can be defined here
    // FormForm.belongsTo(models.FormSubCategory, {foreignKey: 'sub_category_id', as: 'sub_category'})
  };
  return FormForm;
};