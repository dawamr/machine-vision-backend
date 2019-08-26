'use strict';
module.exports = (sequelize, DataTypes) => {
  const product_category = sequelize.define('product_category', {
    name: DataTypes.STRING,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  product_category.associate =  function(models) {
    product_category.hasMany(models.Product, { 
      foreignKey: 'product_category_id' 
    });      
  };
  return product_category;
};