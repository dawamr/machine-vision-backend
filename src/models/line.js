'use strict';
module.exports = (sequelize, DataTypes) => {
  const line = sequelize.define('line', {
    name: DataTypes.STRING,
    sector_id: DataTypes.INTEGER,
    product_category_id: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  line.associate = function(models) {
    line.hasMany(models.sector, {
      foreignKey: 'sector_id'
    });
    line.hasMany(models.product_category, {
      foreignKey: 'product_category_id'
    });
  };
  return line;
};