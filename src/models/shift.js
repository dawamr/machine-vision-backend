'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shift = sequelize.define('shift', {
    name: DataTypes.STRING,
    time_start: DataTypes.TIME,
    time_end: DataTypes.TIME,
    duration: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        Shift.hasMany(models.User, { foreign_key: 'shift_id' });
      }
    },
    underscored: true,
    paranoid: true
  });
  return Shift;
};