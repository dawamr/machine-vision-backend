'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
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
  }, 
  {
    classMethods: {
        associate: (models) => {
          User.belongsToMany(models.Role, { 
            through: 'userRole',
            sourceKey: 'id',
            foreign_key: 'user_id'
          });
          User.belongsTo(models.Shift, { foreign_key: 'shift_id'});
          User.belongsTo(models.department, { foreign_key: 'department_id' });
          User.belongsTo(models.jobDescription, { foreign_key: 'job_description_id' });

        }
    },
    underscored: true,
    paranoid: true
});
        return User;
  };