const Formula = require('../models').calculator_formula;
const Runner = require('../models').calculator_runner;
const RunnerResult = require('../models').calculator_runner_result;
const FormulaParameter = require('../models').calculator_formula_parameter;
const Parameter = require('../models').parameters;

const resp = require('../views/response');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize');
const Op = sequelize.Op

module.exports = {
    calculateResult(req, res){
        let options = {}
        let times = {}
        let level = {}

        let orderBy = 'updatedAt';
        let sortBy = 'desc';
        let page = 1;
        let perPage = 10;

        if(req.query.order_by != undefined && req.query.order_by.length >0){
            orderBy = req.query.order_by
        }
        if(req.query.sort_by != undefined && req.query.sort_by.length >0){
            sortBy = req.query.sort_by
        }
        if(req.query.page != undefined && req.query.page.length >0){
            page = req.query.page
        }
        if(req.query.per_page != undefined && req.query.per_page.length >0){
            perPage = req.query.per_page
        }

        if ((req.query.start_at != undefined) && (req.query.start_at.length > 0)){
            times.time_start = sequelize.where(sequelize.col('start'), '>=', req.query.start_at);
        }
        if ((req.query.end_at != undefined) && (req.query.end_at.length > 0)){
            times.time_end = sequelize.where(sequelize.col('end'), '<=', req.query.end_at);
        }
        if ((req.query.parameter_id != undefined) && (req.query.parameter_id.length > 0)){
            options.parameter_id = sequelize.where(sequelize.col('parameter_id'), '=', req.query.parameter_id);
        }
        if ((req.params.level != undefined) && (req.params.level.length > 0)){
            options.level = sequelize.where(sequelize.col('level'), '=', req.params.level);
        }

        let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);

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
            where: level
        }
        RunnerResult.findAndCountAll({
            attributes: ['id','value',],
            include:[parameter,runner],
            where: options,
            limit: perPageResult,
            offset :offsetResult
        })
        .then(result=>{
            let totalPage = Math.ceil(result.count / perPage);
            let data = resp.paging(result.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, result.count);

            resp.ok(true, "Get list data calculator result.", data, res);
        })
        .catch((error) => {
            resp.ok(false, "Failed get list calculator result.", null, res.status(400));
            console.log(error);
        }); 

    },

}