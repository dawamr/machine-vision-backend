'use strict';
module.exports = (sequelize, DataTypes) => {
  const refresh_token = sequelize.define('refresh_token', {
    refresh_token: DataTypes.TEXT,
    token: DataTypes.TEXT
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  refresh_token.associate = function(models) {
    // associations can be defined here
  };
  return refresh_token;
};