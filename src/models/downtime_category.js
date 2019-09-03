'use strict';
module.exports = (sequelize, DataTypes) => {
  const downtime_category = sequelize.define('downtime_category', {
    name: DataTypes.STRING,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  downtime_category.associate = function(models) {
    downtime_category.hasMany(models.downtime_reason, {
      foreignKey: 'category_id'
    });
  };
  return downtime_category;
};