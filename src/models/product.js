'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    name: DataTypes.STRING,
    product_category_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        Product.belongsTo(models.productCategory,{ foreignKey: 'product_category_id' })      
      }
    },
    underscored: true,
    paranoid: true
  });
  return Product;
};