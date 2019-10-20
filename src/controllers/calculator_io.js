const formula = require('../models').calculator_formula;
const runner = require('../models').calculator_runner;
const runner_result = require('../models').calculator_runner_result;
const formula_parameter = require('../models').calculator_formula_parameter;
const sector = require('../models').sector;
const line = require('../models').line;
const process_machine = require('../models').process_machine;
const process = require('../models').process;
const machine = require('../models').machine;
const parameter = require('../models').parameters;
const sensor = require('../models').sensor;
const sensor_calculator = require('../models').calculator_formula_sensor;


const resp = require('../views/response');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const model = require('../models');
const db = model.sequelize;


module.exports = {

    listSensor(req, res){ 

        tb_sensor = {
            model: sensor,
            as: 'sensor',
        }
        f = {
            model: formula,
            as: 'formula',
        }
        sensor_calculator.findAll({
            attributes: [['id','id_calculator_sensor'],'sensor_id','formula_id','sensor_label','createdAt','updatedAt'],
            include: [tb_sensor,f]
        })
        .then(data => {
            resp.ok(true, `Get list sensoe ${req.params.type} ${req.params.level} `, data, res);
        })
        .catch(error =>{
            resp.ok(false, `Failed get list sensor ${req.params.type} ${req.params.level}`,null, res.status(400));
            console.log(error);
        })
    },

    parameter(req, res){
        parameter.findAll({
            attributes:[['id','id_parameter'],['name','parameter_name'],'data_class','parameter_category_id','group','level','configuration','type','createdAt','updatedAt'],
            where: {
                level: req.params.level,
                group: 'variable'
            }
        })
        .then(data => {
            resp.ok(true, `Get list parameter ${req.params.type} ${req.params.level} `, data, res);
        })
        .catch(error =>{
            resp.ok(false, `Failed get list parameter ${req.params.type} ${req.params.level}`,null, res.status(400));
            console.log(error);
        })
    },
}