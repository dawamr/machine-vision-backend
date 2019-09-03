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
    line.belongsTo(models.sector, {
      foreignKey: 'sector_id'
    });
    line.belongsTo(models.product_category, {
      foreignKey: 'product_category_id'
    });
    line.hasMany(models.process, {
      foreignKey: 'line_id'
    });
  };
  return line;
};