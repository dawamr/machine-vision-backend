'use strict';
module.exports = (sequelize, DataTypes) => {
  const sector = sequelize.define('sector', {
    name: DataTypes.STRING,
    order: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  sector.associate = function(models) {
    sector.belongsTo(models.line, {
      foreignKey: 'line_id'
    });
  };
  return sector;
};