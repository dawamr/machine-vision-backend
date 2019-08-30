'use strict';
module.exports = (sequelize, DataTypes) => {
  const category_reason = sequelize.define('category_reason', {
    reason_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  category_reason.associate = function(models) {
    // associations can be defined here
  };
  return category_reason;
};