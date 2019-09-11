'use strict';
module.exports = (sequelize, DataTypes) => {
  const FormResponse = sequelize.define('form_response', {
    form_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    response: DataTypes.JSON
  }, {
    paranoid: true
  });
  FormResponse.associate = function(models) {
    // associations can be defined here
    FormResponse.belongsTo(models.form_form, {foreignKey: "form_id", as: 'form_list'})
    FormResponse.belongsTo(models.user, {foreignKey: "user_id", as: 'user'})

    FormResponse.hasMany(models.form_response_field, {as: 'form_response_field'})
  };
  return FormResponse;
};