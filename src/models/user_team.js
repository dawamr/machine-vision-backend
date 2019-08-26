'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_team = sequelize.define('user_team', {
    user_id: DataTypes.INTEGER,
    team_id: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  user_team.associate = function(models) {
    user_team.hasMany(models.user, {
      foreignKey: 'user_id'
    });
    user_team.hasMany(models.team, {
      foreignKey: 'team_id'
    });
  };
  return user_team;
};