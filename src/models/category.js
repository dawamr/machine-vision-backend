'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: DataTypes.STRING,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  category.associate = function(models) {
    category.hasMany(models.reason, {
      foreignKey: 'category_id'
    });
  };
  return category;
};