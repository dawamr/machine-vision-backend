'use strict';
module.exports = (sequelize, DataTypes) => {
  const FormCategory = sequelize.define('form_category', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: DataTypes.STRING
  }, 
  {
    paranoid: true
  });
  FormCategory.associate = function(models) {
    // associations can be defined here
    FormCategory.hasMany(models.form_sub_category, {as: 'sub_category'})
  };
  return FormCategory;
};  