'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_team = sequelize.define('user_team', {
    user_id: DataTypes.UUID,
    team_id: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  user_team.associate = function(models) {
  };
  return user_team;
};