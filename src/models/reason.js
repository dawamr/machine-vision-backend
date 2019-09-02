'use strict';
module.exports = (sequelize, DataTypes) => {
  const reason = sequelize.define('reason', {
    name: DataTypes.STRING,
    impact: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  reason.associate = function(models) {
    reason.belongsTo(models.category, {
      foreignKey: 'category_id'
    });
  };
  return reason;
};