'use strict';
module.exports = (sequelize, DataTypes) => {
  const sector = sequelize.define('sector', {
    name: DataTypes.STRING,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  sector.associate = function(models) {
    sector.hasMany(models.line, {
      foreignKey: 'sector_id'
    });
    sector.hasMany(models.user, {
      foreignKey: 'sector_id'
    });
    sector.hasMany(models.line, {
      foreignKey: 'sector_id'
    });
  };
  return sector;
};