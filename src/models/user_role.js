'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_role = sequelize.define('user_role', {
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {
    underscored: true,
    paranoid: true
  });
  user_role.associate = function(models) {
    // associations can be defined here
  };
  return user_role;
};