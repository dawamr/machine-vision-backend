'use strict';
module.exports = (sequelize, DataTypes) => {
  const machine = sequelize.define('machine', {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    image: DataTypes.STRING,
    manufacturer: DataTypes.STRING,
    build_year: DataTypes.STRING,
    asset_number: DataTypes.STRING,
    cycle_time: DataTypes.STRING,
    delta_t_tg: DataTypes.STRING,
    delta_t_tr: DataTypes.STRING,
    delta_t_gr: DataTypes.STRING,
    sensor_total_status: DataTypes.BOOLEAN,
    sensor_reject_status: DataTypes.BOOLEAN,
    sensor_good_status: DataTypes.BOOLEAN,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  machine.associate = function(models) {
    // machine.belongsTo(models.data_sensor, {
    //   foreignKey: 'data_sensor_id'
    //  });
    machine.belongsToMany(models.process, {
      through: 'process_machine',
      foreignKey: 'machine_id',
      otherKey: 'process_id'
    });
    machine.hasMany(models.process_machine, {
      foreignKey: 'machine_id',
    });
    // machine.hasMany(models.user, {
    //   foreignKey:'machine_id'
    // });
  };
  return machine;
};