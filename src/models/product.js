'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: DataTypes.STRING,
    product_category_id: DataTypes.INTEGER
  }, {
    underscored: true,
    paranoid: true
  });
  product.associate = function(models) {
    product.belongsTo(models.product_category,{ foreignKey: 'product_category_id' })      
    }
  return product;
};