'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
    name: DataTypes.STRING
  },   {
    classMethods: {
      associate: (models) => {
        Role.belongsToMany(models.User, { 
          through: 'userRole',
          sourceKey: 'id',
          foreign_key: 'role_id'
        });
      }
    },
    underscored: true,
    paranoid: true
  });
return Role;
};