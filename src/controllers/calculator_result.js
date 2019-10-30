const Formula = require('../models').calculator_formula;
const Runner = require('../models').calculator_runner;
const RunnerResult = require('../models').calculator_runner_result;
const FormulaParameter = require('../models').calculator_formula_parameter;
const Parameter = require('../models').parameters;

const resp = require('../views/response');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const model = require('../models');
const db = model.sequelize;

module.exports = {
    calculateResult(req, res){
        let options = {}
        let times = {}

        if ((req.query.start_at != undefined) && (req.query.start_at.length > 0)){
            times.time_start = sequelize.where(sequelize.col('start'), '>=', req.query.start_at);
        }
        if ((req.query.end_at != undefined) && (req.query.end_at.length > 0)){
            times.time_end = sequelize.where(sequelize.col('end'), '<=', req.query.end_at);
        }
        if ((req.query.parameter_id != undefined) && (req.query.parameter_id.length > 0)){
            options.parameter_id = sequelize.where(sequelize.col('parameter_id'), '=', req.query.parameter_id);
        }

        var runner = {
            model: Runner,
            as: 'runner',
            attributes: ['id',['start','time_start'],['end','time_end'],['execute_time','execution_time']],
            where: times
        }
        var parameter = {
            model: Parameter,
            as: 'parameter',
            attributes:['id','name'],
        }
        RunnerResult.findAll({
            attributes: ['id','value',],
            include:[parameter,runner],
            where: options
        })
        .then(result=>{
            resp.ok(true, "Get list data plant.", result, res);
        })
        .catch((error) => {
            resp.ok(false, "Failed get list data plant.", null, res.status(400));
            console.log(error);
        }); 

    }
}