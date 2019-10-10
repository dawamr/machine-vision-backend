'use strict';
module.exports = (sequelize, DataTypes) => {
  const process = sequelize.define('process', {
    name: DataTypes.STRING,
    line_id: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  process.associate = function(models) {
    process.belongsToMany(models.machine, {
      through: 'process_machine',
      foreignKey: 'process_id',
      otherKey: 'machine_id'
    });
    process.hasMany(models.process_machine, {as: 'process_machine'})
    process.belongsTo(models.line, {
      foreignKey: 'line_id'
    });
  };
  return process;
};