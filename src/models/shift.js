'use strict';
module.exports = (sequelize, DataTypes) => {
  const shift = sequelize.define('shift', {
    name: DataTypes.STRING,
    time_start: DataTypes.TIME,
    time_end: DataTypes.TIME,
    duration: DataTypes.STRING
  }, {
    underscored: true,
    paranoid: true
  });
    shift.associate = function(models) {
      shift.hasMany(models.User, { foreignKey: 'shift_id' });
    }
  return shift;
};