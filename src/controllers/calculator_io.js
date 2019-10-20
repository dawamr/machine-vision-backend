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
const sensor_calculator = require('../models').calculator_sensor;


const resp = require('../views/response');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const model = require('../models');
const db = model.sequelize;


module.exports = {
    Test(req, res){
        let options = []
        // return console.log(req.params.level)
        let f = {
            model: formula,
            as: 'formula',
            attributes: ['id','level','level_reference_id','formula_script','formula_xml','createdAt','updatedAt'],      
            where:{
                'level': req.params.level,
                'is_active' : true,
            },
        }
        let s = sensor_calculator.findAll({
            attributes: [['id','id_sensor'],'formula_id','sensor_name','sensor_data'],
            // include: [f]
        })

        let pv = parameter.findAll({
            attributes:[['id','id_parameter'],['name','parameter_name'],'parameter_category_id','group','level','configuration','type','createdAt','updatedAt'],
            where: {
                level: req.params.level,
                group: 'variable'
            }
        })

        let po = parameter.findAll({
            attributes:[['id','id_parameter'],['name','parameter_name'],'parameter_category_id','group','level','configuration','type','createdAt','updatedAt'],
            where: {
                level: req.params.level,
                group: 'output'
            }
        })

        Promise.all([s,pv,po])
        .then(result=>{
            resp.ok(true, `Get Caculator IO Editor ${req.params.level}`, result, res);
        }).catch(err=>{
            resp.ok(false, `Get Caculator IO Editor ${req.params.level}`, null, res.status(400));
            console.log(error);
        })

    }
}