'use strict';
module.exports = (sequelize, DataTypes) => {
  const refresh_token = sequelize.define('refresh_token', {
    refresh_token: DataTypes.TEXT,
    token: DataTypes.TEXT
  }, {
    createdAt: 'created_at',
<<<<<<< HEAD
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
=======
    updatedAt: 'updated_at'
>>>>>>> b5227ad4d9c3b596a8db7bd49e48c44a8bcd2203
  });
  refresh_token.associate = function(models) {
    // associations can be defined here
  };
  return refresh_token;
};