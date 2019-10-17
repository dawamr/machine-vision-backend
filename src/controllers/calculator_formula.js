const formula = require('../models').calculator_formula;
const formula_parameter = require('../models').calculator_formula_parameter;
const sector = require('../models').sector;
const line = require('../models').line;
const process_machine = require('../models').process_machine;
const process = require('../models').process;
const machine = require('../models').machine;
const parameter = require('../models').parameter;

const resp = require('../views/response');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const model = require('../models');
const db = model.sequelize;

module.exports = {

    listCalculator(req, res){
        // const before = Date.now();
        let new_result = [];
        let orderBy = 'createdAt';
        let sortBy = 'desc';
        // let options = {};
        let s = {
            model: sector,
            attributes: [['id','id_sector'],['name','sector_name']],
        }
        let l = {
            model: line,
            attributes: [['id','id_line'],['name','line_name'],['sector_id','line_sector_id']],
            include:[s]
        }
        let p = {
            model: process,
            attributes: [['id','id_process'],['name','name_process'],['line_id','process_line_id']],
            include:[l]
        }
        let m = {
            model: machine,
            attributes:[['id','id_machine'],['name','machine_name']],
        }
        process_machine.findAll({
            attributes: [],
            include:[p,m]
        })
        .then(result => {
            result.map(data =>{   
                if(req.query.calculator == 'machine'){
                    new_result.push({
                        "machine_id" : data.machine.dataValues.id_machine,
                        "machine_name" : data.machine.dataValues.machine_name,
                        // "line_id" : data.process.line.dataValues.id_line,
                        "line_name" : data.process.line.dataValues.line_name,
                        // "sector_id" :data.process.line.dataValues.sector.dataValues.id_sector,
                        "sector_name" :data.process.line.dataValues.sector.dataValues.sector_name,
                        "status": "not-active",
                        "messege" : "The code is not set"
                    })
                }
                if(req.query.calculator == 'sector'){
                    new_result.push({
                        // "machine_id" : data.machine.dataValues.id_machine,
                        "sector_id" :data.process.line.dataValues.sector.dataValues.id_sector,
                        "sector_name" :data.process.line.dataValues.sector.dataValues.sector_name,
                        "machine_name" : data.machine.dataValues.machine_name,
                        // "line_id" : data.process.line.dataValues.id_line,
                        "line_name" : data.process.line.dataValues.line_name,
                        "status": "not-active",
                        "messege" : "The code is not set"
                    })
                }
                if(req.query.calculator == 'line'){
                    new_result.push({
                        // "machine_id" : data.machine.dataValues.id_machine,
                        "line_id" : data.process.line.dataValues.id_line,
                        "line_name" : data.process.line.dataValues.line_name,
                        "machine_name" : data.machine.dataValues.machine_name,
                        // "sector_id" :data.process.line.dataValues.sector.dataValues.id_sector,
                        "sector_name" :data.process.line.dataValues.sector.dataValues.sector_name,
                        "status": "not-active",
                        "messege" : "The code is not set"
                    })
                }
            })
            // let execut =(Date.now() - before)
            resp.ok(true, `Get all data calculator ${req.query.calculator} list.`, new_result, res);
        })
        .catch((error) => {
          resp.ok(false, `Failed get all data calculator ${req.query.calculator} list.`, null, res.status(400));
          console.log(error);
        });
    },

    list(req, res){
        let orderBy = 'created_at';
        let sortBy = 'desc';
        let page = 1;
        let perPage = 10;
        let options = {};
        let required = false;
        if ((req.query.page != undefined) && (req.query.page.length > 0)) {
            page = req.query.page;
        }
        if ((req.query.per_page != undefined) && (req.query.per_page.length > 0)) {
            perPage = req.query.per_page;
        }
        if ((req.query.line_id != undefined) && (req.query.line_id.length > 0)){
            options.line_id = Sequelize.where(Sequelize.col('line.id'), '=', req.query.line_id );
            required = true;
        }
        if ((req.query.sector_id != undefined) && (req.query.sector_id.length > 0)){
            options.sector_id = Sequelize.where(Sequelize.col('sector.id'), '=', req.query.sector_id );
            required = true;
        }
      
        let skip = (page - 1) * perPage
        let var_sector = {
            model: sector,
            as: 'sector',
            attributes: [['id','sector_id'],['name','sector_name'],'created_at','updated_at'],
            where:options
        }
        line.findAll({
            attributes:[['id','line_id'],['name','line_name'],'created_at','updated_at'],
            include: [var_sector],
            order: [
                [orderBy, sortBy]
            ],
            where : options,
            limit: perPage,
            offset :skip
        })
        .then(result => res.status(201).send(result))
        .catch(error => res.status(400).send(error));
    },

}