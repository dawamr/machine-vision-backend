'use strict';
module.exports = (sequelize, DataTypes) => {
  const refresh_token = sequelize.define('refresh_token', {
    refresh_token: DataTypes.TEXT,
    token: DataTypes.TEXT
  }, {
    underscored: true
  });
  refresh_token.associate = function(models) {
    // associations can be defined here
  };
  return refresh_token;
};