'use strict';
module.exports = (sequelize, DataTypes) => {
  const parameters = sequelize.define('parameters', {
    name: {
      type: STRING,
      
    },
    parameter_category_id: {
      type:INTEGER,
      validate:{
        isInt: {
          msg: "Must be an integer number"
        }
      }
    },
    group:{
      type:ENUM('variable','output'
      )},
    level: {type:ENUM('plant','sector','line','machine')
  },
    type: {
      type:ENUM('constant','initial','manufacture','kpi','predictive')
    },
    alarm_configuration: {
      type:JSON
    },
    configuration: {
      type:JSON
    },
    deletedAt: {type:DATE
}  
}, {
    paranoid: true
  });
  parameters.associate = function(models) {
    // associations can be defined here
    parameters.belongsTo(models.parameter_categories,{
      foreignKey : 'parameter_category_id',
      as :'parameter_category'
    })
  };
  return parameters;
};