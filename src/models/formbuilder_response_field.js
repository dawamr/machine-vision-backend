'use strict';
module.exports = (sequelize, DataTypes) => {
  const FormResponseField = sequelize.define('form_response_field', {
    form_field_id: DataTypes.INTEGER,
    form_response_id: DataTypes.INTEGER
  }, {
    paranoid: true
  });
  FormResponseField.associate = function(models) {
    // associations can be defined here
    FormResponseField.belongsTo(models.form_field, {foreignKey: "form_field_id", as: 'form_field'})
    FormResponseField.belongsTo(models.form_response, {foreignKey: "form_response_id", as: 'form_response'})
  };
  return FormResponseField;
};