'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    name: DataTypes.STRING
  },   {
    underscored: true,
    paranoid: true
  });
  role.associate = function(models){
      role.belongsToMany(models.user, { 
        through: 'user_role',
        foreignKey: 'role_id'
      });
    }
return role;
};