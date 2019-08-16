'use strict';
module.exports = (sequelize, DataTypes) => {
  const FormForm = sequelize.define('form_form', {
    sub_category_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    types:{
      type : DataTypes.ENUM,
      values : (['widget', 'non-widget'])
    },
    is_template: DataTypes.BOOLEAN
  }, {
    timestamps: true,
    createdAt: true,
    deletedAt: true,
    paranoid: true
  });
  FormForm.associate = function(models) {
    // associations can be defined here
    FormForm.belongsTo(models.form_sub_category, {foreignKey: 'sub_category_id', as: 'sub_category'})
  };
  return FormForm;
};