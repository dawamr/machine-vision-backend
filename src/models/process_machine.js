'use strict';
module.exports = (sequelize, DataTypes) => {
  const process_machine = sequelize.define('process_machine', {
    process_id: DataTypes.INTEGER,
    machine_id: DataTypes.INTEGER,
    from_machine_id: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  process_machine.associate = function (models) {
  };
  return process_machine;
};