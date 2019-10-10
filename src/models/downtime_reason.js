'use strict';
module.exports = (sequelize, DataTypes) => {
  const downtime_reason = sequelize.define('downtime_reason', {
    name: DataTypes.STRING,
    impact: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    line_id: DataTypes.INTEGER,
    process_id: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  downtime_reason.associate = function(models) {
    downtime_reason.belongsTo(models.downtime_category, {
      foreignKey: 'category_id'
    });
  };
  return downtime_reason;
};