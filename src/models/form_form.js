'use strict';
module.exports = (sequelize, DataTypes) => {
  const FormForm = sequelize.define('form_form', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    sub_category_id: DataTypes.UUID,
    name: DataTypes.STRING,
    types:{
      type : DataTypes.ENUM,
      values : (['widget', 'non-widget'])
    },
    is_template: DataTypes.BOOLEAN
  }, {
    paranoid: true
  });
  FormForm.associate = function(models) {
    // associations can be defined here
    // FormForm.belongsTo(models.form_sub_category, {foreignKey: 'sub_category_id', as: 'sub_category'})
  };
  return FormForm;
};