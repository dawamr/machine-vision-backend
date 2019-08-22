'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
    name: DataTypes.STRING
  },   {
    classMethods: {
      associate: (models) => {
        Role.belongsToMany(models.User, { 
          through: 'user_role',
          foreignKey: 'role_id'
        });
      }
    },
    underscored: true,
    paranoid: true
  });
return Role;
};