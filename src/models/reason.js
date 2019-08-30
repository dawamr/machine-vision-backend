'use strict';
module.exports = (sequelize, DataTypes) => {
  const reason = sequelize.define('reason', {
    name: DataTypes.STRING,
    impact: DataTypes.STRING,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  reason.associate = function(models) {
    reason.belongsToMany(models.category, {
      through: 'category_reason',
      foreignKey: 'reason_id',
      otherKey: 'category_id'
    });
  };
  return reason;
};