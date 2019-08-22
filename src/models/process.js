'use strict';
module.exports = (sequelize, DataTypes) => {
  const process = sequelize.define('process', {
    name: DataTypes.STRING,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  process.associate = function(models) {
    process.belongsTo(models.process_machine, {
      foreignKey: 'process_machine_id'
    });
  };
  return process;
};