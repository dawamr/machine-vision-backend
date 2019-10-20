const formula = require('../models').calculator_formula;
const formula_parameter = require('../models').calculator_formula_parameter;
const sector = require('../models').sector;
const line = require('../models').line;
const plant = require('../models').plant;
const process_machine = require('../models').process_machine;
const process = require('../models').process;
const machine = require('../models').machine;
const parameter = require('../models').parameter;

const resp = require('../views/response');
const pagination = require('../utils/pagination');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const model = require('../models');
const db = model.sequelize;

module.exports = {

    machineListTest(req,res){
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
            attributes:[['id','id_machine'],['name','machine_name'],'created_at','updated_at'],
        }
        process_machine.findAll({
            attributes: [],
            include:[p,m]
        })
        .then(result => {
            result.map(data =>{
                console.log(data.machine.dataValues)
                new_result.push({
                    "machine_id" : data.machine.dataValues.id_machine,
                    "machine_name" : data.machine.dataValues.machine_name,
                    "createdAt":data.machine.dataValues.created_at,
                    "updatedAt":data.machine.dataValues.updated_at,
                        "line":{
                            "line_id" : data.process.line.dataValues.id_line,
                            "line_name" : data.process.line.dataValues.line_name,
                            "sector" :{
                                "sector_id" :data.process.line.dataValues.sector.dataValues.id_sector,
                                "sector_name" :data.process.line.dataValues.sector.dataValues.sector_name,
                            }
                        },
                    "status": "not-active",
                    "messege" : "The code is not set"
                })
            })
            // let execut =(Date.now() - before)
            resp.ok(true, `Get all data calculator machinelist.`, new_result, res);
        })
        .catch((error) => {
          resp.ok(false, `Failed get all data calculator machine list.`, null, res.status(400));
          console.log(error);
        });
    },
    machineList(req, res){
        let orderBy = 'created_at';
        let sortBy = 'desc';
        let page = 1;
        let perPage = 10;
        let options = {};
        let lineOptions = {};
        let required = false;
    
        if ((req.query.order_by != undefined) && (req.query.order_by.length > 0)) {
            orderBy = req.query.order_by;
        }
        if ((req.query.sort_by != undefined) && (req.query.sort_by.length > 0)) {
            sortBy = req.query.sort_by;
        }
        if ((req.query.page != undefined) && (req.query.page.length > 0)) {
            page = req.query.page;
        }
        if ((req.query.per_page != undefined) && (req.query.per_page.length > 0)) {
            perPage = req.query.per_page;
        }
        if ((req.query.search != undefined) && (req.query.search.length > 0)){
            options.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + req.query.search + '%');
        }
        if ((req.query.line_id != undefined) && (req.query.line_id.length > 0)){
            lineOptions.id = sequelize.where(sequelize.col('line_id'), '=', req.query.line_id );
            required = true;
        }
        
        let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);
    
        return machine
            .findAndCountAll({
            where: options,
            include: [{
                model: process,
                where: lineOptions,
                required: required,
                attributes: [],
            }],
            order: [
                [orderBy, sortBy]
            ],
            limit:  perPageResult,
            offset: offsetResult,
            })
            .then(machineResult => {
            let totalPage = Math.ceil(machineResult.count / perPage);
            let data = resp.paging(machineResult.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, machineResult.count);
    
            resp.ok(true, "Get list data machine.", data, res);
            })
        .catch((error) => {
            resp.ok(false, "Failed get list data machine.", null, res.status(400));
            console.log(error);
        });
    },
    sectorList(req,res){
        let orderBy = 'created_at';
        let sortBy = 'desc';
        let page = 1;
        let perPage = 10;
        let options = {};

        if ((req.query.order_by != undefined) && (req.query.order_by.length > 0)) {
        orderBy = req.query.order_by;
        }
        if ((req.query.sort_by != undefined) && (req.query.sort_by.length > 0)) {
        sortBy = req.query.sort_by;
        }
        if ((req.query.page != undefined) && (req.query.page.length > 0)) {
        page = req.query.page;
        }
        if ((req.query.per_page != undefined) && (req.query.per_page.length > 0)) {
        perPage = req.query.per_page;
        }
        if ((req.query.search != undefined) && (req.query.search.length > 0)){
        options.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + req.query.search + '%');
        }

        let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);

        return sector
        .findAndCountAll({
            where: options,
            order: [
            [orderBy, sortBy]
            ],
            limit:  perPageResult,
            offset: offsetResult,
        })
        .then(sectorResult => {
            let totalPage = Math.ceil(sectorResult.count / perPage);
            let data = resp.paging(sectorResult.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, sectorResult.count);

            resp.ok(true, "Get list data sector.", data, res);
        })
        .catch((error) => {
            resp.ok(false, "Failed get list data sector.", null, res.status(400));
            console.log(error);
        });
    },
    lineList(req,res){
        let orderBy = 'created_at';
        let sortBy = 'desc';
        let page = 1;
        let perPage = 10;
        let options = {};

        if ((req.query.order_by != undefined) && (req.query.order_by.length > 0)) {
        orderBy = req.query.order_by;
        }
        if ((req.query.sort_by != undefined) && (req.query.sort_by.length > 0)) {
        sortBy = req.query.sort_by;
        }
        if ((req.query.page != undefined) && (req.query.page.length > 0)) {
        page = req.query.page;
        }
        if ((req.query.per_page != undefined) && (req.query.per_page.length > 0)) {
        perPage = req.query.per_page;
        }
        if ((req.query.search != undefined) && (req.query.search.length > 0)){
        options.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('line.name')), 'LIKE', '%' + req.query.search.toLowerCase() + '%');
        }
        if ((req.query.sector_id != undefined) && (req.query.sector_id.length > 0)) {
        options.sector_id = sequelize.where(sequelize.col('line.sector_id'), '=', req.query.sector_id);
        }

        let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);

        return line
        .findAndCountAll({
            include: [{
            model: sector,
            }],
            where: options,
            order: [
            [orderBy, sortBy]
            ],
            limit:  perPageResult,
            offset: offsetResult,
        })
        .then(lineResult => {
            let totalPage = Math.ceil(lineResult.count / perPage);
            let data = resp.paging(lineResult.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, lineResult.count);

            resp.ok(true, "Get list data line.", data, res);
        })
        .catch((error) => {
            resp.ok(false, "Failed get list data line.", null, res.status(400));
            console.log(error);
        });
    },
    plantList(req,res){
        let orderBy = 'created_at';
        let sortBy = 'desc';
        let page = 1;
        let perPage = 10;
        let options = {};

        if ((req.query.order_by != undefined) && (req.query.order_by.length > 0)) {
        orderBy = req.query.order_by;
        }
        if ((req.query.sort_by != undefined) && (req.query.sort_by.length > 0)) {
        sortBy = req.query.sort_by;
        }
        if ((req.query.page != undefined) && (req.query.page.length > 0)) {
        page = req.query.page;
        }
        if ((req.query.per_page != undefined) && (req.query.per_page.length > 0)) {
        perPage = req.query.per_page;
        }
        if ((req.query.search != undefined) && (req.query.search.length > 0)){
        options.factory_name = sequelize.where(sequelize.fn('LOWER', sequelize.col('factory_name')), 'LIKE', '%' + req.query.search + '%');
        }

        let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);

        return plant
        .findAndCountAll({
            where: options,
            order: [
            [orderBy, sortBy]
            ],
            limit:  perPageResult,
            offset: offsetResult,
        })
        .then(plantResult => {
            let totalPage = Math.ceil(plantResult.count / perPage);
            let data = resp.paging(plantResult.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, plantResult.count);

            resp.ok(true, "Get list data plant.", data, res);
        })
        .catch((error) => {
            resp.ok(false, "Failed get list data plant.", null, res.status(400));
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