'use strict';
module.exports = (sequelize, DataTypes) => {
  const product_category = sequelize.define('product_category', {
    name: DataTypes.STRING
  }, {
    underscored: true,
    paranoid: true
  });
  product_category.associate =  function(models) {
      product_category.hasMany(models.product, { foreignKey: 'product_category_id' })      
    }
  return product_category;
};