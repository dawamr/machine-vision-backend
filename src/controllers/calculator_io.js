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

const resp = require('../views/response');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const model = require('../models');
const db = model.sequelize;

module.exports = {
    Test(req, res){
        sensor.findAll({
            attributes: [['id','id_sensor'],['name','label'],'last_data','heartbeat']
        })
        .then(result=>{
            resp.ok(true, `Get Caculator IO Editor ${req.query.calculator}`, result, res);
        }).catch(err=>{
            resp.ok(false, `Get Caculator IO Editor ${req.query.calculator}`, null, res.status(400));
            console.log(error);
        })
        // let pv = parameter.findAll({
        //     attributes:[['id','id_parameter'],['name','parameter_name'],'parameter_category_id','group','level','configuration','type','createdAt','updatedAt'],
        //     where: {
        //         level: req.query.calculator,
        //         group: 'variable'
        //     }
        // })

        // let po = parameter.findAll({
        //     attributes:[['id','id_parameter'],['name','parameter_name'],'parameter_category_id','group','level','configuration','type','createdAt','updatedAt'],
        //     where: {
        //         level: req.query.calculator,
        //         group: 'output'
        //     }
        // })

        // Promise.all([s,pv,po])
        // .then(result=>{
        //     resp.ok(true, `Get Caculator IO Editor ${req.query.calculator}`, result, res);
        // }).catch(err=>{
        //     resp.ok(false, `Get Caculator IO Editor ${req.query.calculator}`, null, res.status(400));
        //     console.log(error);
        // })

    }
}