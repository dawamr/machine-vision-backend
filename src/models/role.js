'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    name: DataTypes.STRING,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  role.associate = function(models){
    role.belongsToMany(models.user, { 
      through: 'user_role',
      foreignKey: 'role_id'
    });
  }; 
return role;
};