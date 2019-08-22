'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: { type: DataTypes.STRING, allowNull: false},
    username: { type: DataTypes.STRING, allowNull: false},
    password: { type: DataTypes.STRING, allowNull: false},
    photo: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    sector_id: { type: DataTypes.INTEGER, allowNull: false},
    line_id: { type: DataTypes.INTEGER, allowNull: false},
    machine_id: { type: DataTypes.INTEGER, allowNull: false},
    team_id: { type: DataTypes.INTEGER, allowNull: false},
    department_id: { type: DataTypes.INTEGER, allowNull: false},
    job_description_id: { type: DataTypes.INTEGER, allowNull: false},
    shift_id: DataTypes.INTEGER
  },{
    underscored: true,
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
    }
        return user;
  };