const uuid = require('uuid/v4');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1
    },
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    photo: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    sector_id: DataTypes.INTEGER,
    line_id: DataTypes.INTEGER,
    machine_id: DataTypes.INTEGER,
    team_id: DataTypes.INTEGER,
    department_id: DataTypes.INTEGER,
    job_description_id: DataTypes.INTEGER,
    shift_id: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  user.associate = function(models) {
    user.belongsToMany(models.role, { 
      through: 'user_role',
      foreignKey: 'user_id'
    });
    user.belongsToMany(models.team, { 
      through: 'user_team',
      foreignKey: 'user_id'
    });
    user.belongsTo(models.shift, { foreignKey: 'shift_id'});
    user.belongsTo(models.department, { foreignKey: 'department_id' });
    user.belongsTo(models.job_description, { foreignKey: 'job_description_id' });
    user.belongsTo(models.sector, {foreignKey: 'sector_id'});
    user.belongsTo(models.line, {foreignKey: 'line_id'});
    user.belongsTo(models.machine, {foreignKey: 'machine_id'});
  };
  return user;
};