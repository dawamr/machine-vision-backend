const Runner = require('../models').calculator_runner;
const Formula = require('../models').calculator_formula;
const RunnerResult = require('../models').calculator_runner_result;
const Parameter = require('../models').parameters;

const resp = require('../views/response');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const model = require('../models');
const db = model.sequelize;

module.exports = {

    runnerList(req,res){

        let orderBy = 'updatedAt';
        let sortBy = 'desc';
        let page = 1;
        let perPage = 10;
        let options = {}

        if ((req.query.formula_id != undefined) && (req.query.formula_id.length > 0)){
            options.formula_id = sequelize.where(sequelize.col('formula_id'), '=', req.query.formula_id);
        }

        let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);

        Runner.findAndCountAll({
            attributes: ['id','formula_id',['start','time_start'],['end','time_end'],'execute_time','createdAt','updatedAt'],
            where: options,
            order: [
                [orderBy, sortBy]
            ],
            limit:  perPageResult,
            offset: offsetResult,
        })
        .then(result => {
            let totalPage = Math.ceil(result.count / perPage);
            let data = resp.paging(result.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, result.count);
            resp.ok(true, "Get runner list.", data, res);
        })
        .catch(error => {
            resp.ok(false, `Cannot get runner list.`, null, res.status(400));
            console.log(error);
        })

    },

    runnerDetail(req, res){

        Runner.findByPk(req.params.id,{
            attributes: ['id','formula_id',['start','time_start'],['end','time_end'],'execute_time','formula_script','formula_xml','createdAt','updatedAt'],
        })
        .then(result => {
            resp.ok(true, 'get runner details', result, res)
        })
        .catch(error => {
            resp.ok(false, `Cannot get runner details.`, null, res.status(400));
            console.log(error);
        })

    },

    runnerRun(req,res){

        let before = Date.now();

        Formula.findByPk(req.body.formula_id)
        .then(data => {

            let end = Date.now()
            let execute =(end - before)

            Runner.create({
                formula_id: req.body.formula_id,
                start: before,
                end: end,
                execute_time: execute,
                forula_script: data.formula_script,
                formula_xml: data.formula_xml,
                logs: req.body.logs
            })
            .then(result => {
                resp.ok(true, 'success', result,res)
            })
            .catch(error => {
                resp.ok(false, `failed running`, null, res.status(400));
                console.log(error);
            })
        })
        
    },

    storeResult(req,res){

        Parameter.findByPk(req.body.parameter_id,{
            attributes: ['name']
        })
        .then(data =>{
            
            RunnerResult.create({
                parameter_id: req.body.parameter_id,
                value: req.body.value,
                runner_id: req.params.id,
                parameter_name: data.name
            })
            .then(result => {
                resp.ok(true, 'success', result,res)
            })
            .catch(error => {
                resp.ok(false, `failed`, null, res.status(400));
                console.log(error);
            })

        })


    },

    resultList(req,res){

        let orderBy = 'updatedAt';
        let sortBy = 'desc';
        let page = 1;
        let perPage = 10;
        let options = {}

        if ((req.query.runner_id != undefined) && (req.query.runner_id.length > 0)){
            options.runner_id = sequelize.where(sequelize.col('runner_id'), '=', req.query.runner_id);
        }

        let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);

        RunnerResult.findAndCountAll({
            where: options,
            order: [
                [orderBy, sortBy]
            ],
            limit:  perPageResult,
            offset: offsetResult,
        })
        .then(result => {
            let totalPage = Math.ceil(result.count / perPage);
            let data = resp.paging(result.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, result.count);
            resp.ok(true, "Get runner result list.", data, res);
        })
        .catch(error => {
            resp.ok(false, `Cannot get runner result list.`, null, res.status(400));
            console.log(error);
        })
    },

    resultAll(req, res){

        let orderBy = 'updatedAt';
        let sortBy = 'desc';
        let page = 1;
        let perPage = 10;

        let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);

        RunnerResult.findAndCountAll({
            attributes: ['id', 'parameter_id', 'runner_id', 'parameter_name', 'value', 'createdAt', 'updatedAt'],
            order: [
                [orderBy, sortBy]
            ],
            limit:  perPageResult,
            offset: offsetResult,
        })
        .then(result => {
            let totalPage = Math.ceil(result.count / perPage);
            let data = resp.paging(result.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, result.count);
            resp.ok(true, "Get all runner result.", data, res);
        })
        .catch(error => {
            resp.ok(false, `Cannot get all runner result.`, null, res.status(400));
            console.log(error);
        })
    },

    resultDetail(req, res){
        var runner = {
            model: Runner,
            as: 'runner',
            attributes: ['id',['start','time_start'],['end','time_end'],['execute_time','execution_time']],
        }
        var parameter = {
            model: Parameter,
            as: 'parameter',
            attributes:['id','name'],
        }
        RunnerResult.findByPk(req.params.id,{
            attributes: ['id','value',],
            include:[parameter,runner],
        })
        .then(result=>{
            resp.ok(true, "Get list data calculator result detail.", result, res);
        })
        .catch((error) => {
            resp.ok(false, "Failed get list data calculator result detail.", null, res.status(400));
            console.log(error);
        });
    }

}