'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
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
    shift_id: DataTypes.INTEGER
  },{
    underscored: true,
    paranoid: true
  });

    user.associate = function(models) {
      user.belongsToMany(models.Role, { 
        through: 'user_role',
        foreignKey: 'user_id'
      });
      user.belongsTo(models.shift, { foreignKey: 'shift_id'});
      user.belongsTo(models.department, { foreignKey: 'department_id' });
      user.belongsTo(models.job_description, { foreignKey: 'job_description_id' });

    }
        return user;
  };