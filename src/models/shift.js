'use strict';
module.exports = (sequelize, DataTypes) => {
  const shift = sequelize.define('shift', {
    name: DataTypes.STRING,
    time_start: DataTypes.TIME,
    time_end: DataTypes.TIME,
    duration: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  shift.associate = function(models) {
    shift.hasMany(models.user, { 
      foreignKey: 'shift_id' 
    });
  };
  return shift;
};