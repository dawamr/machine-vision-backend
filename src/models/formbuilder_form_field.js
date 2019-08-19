'use strict';
module.exports = (sequelize, DataTypes) => {
  const FormField = sequelize.define('form_field', {
    form_id: DataTypes.INTEGER,
    types: DataTypes.STRING,
    configuration: DataTypes.JSON,
    is_required: DataTypes.BOOLEAN,
    order: DataTypes.INTEGER
  }, {
    paranoid: true
  });
  FormField.associate = function(models) {
    // associations can be defined here
    FormField.belongsTo(models.form_form, {foreignKey: "form_field_id", as: 'form_field'})
  };
  return FormField;
};