'use strict';
module.exports = (sequelize, DataTypes) => {
  const team = sequelize.define('team', {
    name: DataTypes.STRING,
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue : 0
    },
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  team.associate = function(models) {
    // associations can be defined here
  };
  return team;
};