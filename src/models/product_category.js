'use strict';
module.exports = (sequelize, DataTypes) => {
  const productCategory = sequelize.define('product_category', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        productCategory.hasMany(models.Product, { foreignKey: 'product_category_id' })      
      }
    },
    underscored: true,
    paranoid: true
  });
  return productCategory;
};