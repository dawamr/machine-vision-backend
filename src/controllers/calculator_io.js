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
            where: {
                level: req.params.level,
                level_reference_id: req.params.id
            }
        }
        sensor_calculator.findAll({
            attributes: ['id','sensor_id','formula_id','sensor_label','createdAt','updatedAt'],
            include: [tb_sensor,f],
            where:{
                formula_id: req.params.id_formula
            }
        })
        .then(data => {
            resp.ok(true, `Get list sensor ${req.params.type} ${req.params.level} `, data, res);
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
                group: req.params.type
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

    addSensor(req,res){
        formula.findOne({
            where: {
                level: req.params.level,
                level_reference_id: req.params.id,
                id: req.params.id_formula
            }
        })
        .then(result =>{
            console.log(result.id)
            sensor_calculator.create({
                formula_id: result.id,
                sensor_id: req.body.sensor_id,
                sensor_label:req.body.label
            })
            .then(data => {
                resp.ok(true, `Seuccess add sensor variable.`, data, res);
            })
            .catch(error =>{
                resp.ok(false, `Failed add sensor variable.`,null, res.status(400));
                console.log(error);
            })
        })
        .catch(error =>{
            resp.ok(false, `Cannot add sensor variable.`,null, res.status(400));
            console.log(error);
        })
    },

    updateSensor(req,res){
        formula.findOne({
            where: {
                level: req.params.level,
                level_reference_id: req.params.id,
                id: req.params.id_formula
            }
        })
        .then(result =>{
            try {
                sensor_calculator.update({
                    sensor_id: req.body.sensor_id,
                    sensor_label:req.body.label
                }, {
                    where: {
                        id: req.params.id_sensor,
                        sensor_id: req.body.sensor_id,
                    }
                })
                data = {
                    "id": req.params.id_sensor,
                    "sensor_id": req.body.sensor_id,
                    "formula_id": req.params.id_formula,
                    "sensor_label" : req.body.label,
                }
                resp.ok(true, `Success update sensor variable.`,data, res.status(400));
            } catch (error) {
                resp.ok(false, `Failed update sensor variable.`,null, res.status(400));
                console.log(error);
            }
        })
        .catch(error =>{
            resp.ok(false, `Cannot update sensor variable.`,null, res.status(400));
            console.log(error);
        })
    
    },

    deleteSensor(req, res){
        formula.findOne({
            where: {
                level: req.params.level,
                level_reference_id: req.params.id,
                id: req.params.id_formula
            }
        })
        .then(result =>{
            try {
                sensor_calculator.destroy({
                    where: {
                        id : req.params.id_sensor
                    },
                })
                resp.ok(true, `Success delete sensor variable.`,null, res.status(400));
            } catch (error) {
                resp.ok(false, `Failed delete sensor variable.`,null, res.status(400));
                console.log(error);
            }
        })
        .catch(error =>{
            resp.ok(false, `Cannot delete sensor variable.`,null, res.status(400));
            console.log(error);
        })
        
    }

}