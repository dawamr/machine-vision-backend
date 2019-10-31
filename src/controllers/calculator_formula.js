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
const sequelize = require('sequelize');
const Op = sequelize.Op;
const model = require('../models');
const db = model.sequelize;

module.exports = {

    machineList(req,res){
        let orderBy = 'created_at';
        let sortBy = 'desc';
        let page = 1;
        let perPage = 10;
        // let options = {};
        var new_result = [];
        var new_result1 = [];
        let i =0
        let line_id = {}
        let sector_id = {}

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
            options.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('machines.name')), 'LIKE', '%' + req.query.search + '%');
        }
        if ((req.query.line_id != undefined) && (req.query.line_id.length > 0)) {
            line_id = {
                line_id: req.query.line_id
            }
        }
        if ((req.query.sector_id != undefined) && (req.query.sector_id.length > 0)) {
            sector_id = {
                sector_id: req.query.sector_id
            }
        }
        
        let s = {
            model: sector,
            attributes: [['id','id_sector'],['name','sector_name']],
        }
        let l = {
            model: line,
            where: sector_id,
            attributes: [['id','id_line'],['name','line_name'],['sector_id','line_sector_id']],
            include:[s]
        }
        let p = {
            model: process,
            where: line_id,
            attributes: [['id','id_process'],['name','name_process'],['line_id','process_line_id']],
            include:[l]
        }
        let m = {
            model: machine,
            attributes:[['id','id_machine'],['name','machine_name'],'created_at','updated_at'],
            order: [
                [orderBy, sortBy]
            ],
        }

        let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);

        process_machine.findAndCountAll({
            attributes: [],
            include:[p,m],
            limit:  perPageResult,
            offset: offsetResult,
        })
        .then(result => {
            result.rows.map(data =>{
                new_result[i] = formula.findAll({
                    where: {
                        level: 'machine',
                        level_reference_id: data.machine.dataValues.id_machine,
                        is_active : true
                    },
                    attributes:['is_active']
                })
                i+= 1 

            })
            Promise.all(new_result)
            .then(data =>{
                let o = 0
                result.rows.map(y=>{
                    var status = 'not-ctive'
                    var message= 'This code is set'
                    
                    if (data[o].length >0){
                        status = 'active'
                        message= 'This code is set'
                    }
                    
                    new_result1.push({
                        "machine_id" : y.machine.dataValues.id_machine,
                        "machine_name" : y.machine.dataValues.machine_name,
                        "createdAt":y.machine.dataValues.created_at,
                        "updatedAt":y.machine.dataValues.updated_at,
                            "line":{
                                "line_id" : y.process.line.dataValues.id_line,
                                "line_name" : y.process.line.dataValues.line_name,
                                "sector" :{
                                    "sector_id" :y.process.line.dataValues.sector.dataValues.id_sector,
                                    "sector_name" :y.process.line.dataValues.sector.dataValues.sector_name,
                                }
                            },
                        
                        "status": status,
                        "messege" : message
                    })
                o+=1
                })

                let totalPage = Math.ceil(result.count / perPage);
                let dataResult = resp.paging(new_result1, parseInt(showPageResult), parseInt(perPageResult), totalPage, result.count);
                resp.ok(true, "Get list data machine.", dataResult, res);
            })
            // for (let y = 0; y < new_result.length; y++) {
            // }
        })
        .catch((error) => {
            resp.ok(false, `Failed get all data calculator machine list.`, null, res.status(400));
            console.log(error);
        });
    },

    sectorList(req,res){
        let orderBy = 'created_at';
        let sortBy = 'desc';
        let page = 1;
        let perPage = 10;
        let options = {};
        var new_result = [];
        var new_result1 = [];
        let i =0

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
            options.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('sector.name')), 'LIKE', '%' + req.query.search + '%');
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
        .then(result => {
            // res.json(result)
            // console.log(result.rows.length)
            result.rows.map(data =>{
                new_result[i] = formula.findOne({
                    where: {
                        level: 'sector',
                        is_active : true,
                        level_reference_id: data.id
                    },
                    attributes:['is_active']
                })
                i+= 1 
            }) 
            

            Promise.all(new_result)
            .then(data =>{
                let o = 0
                result.rows.map(y =>{
                    var status = 'not-ctive'
                    var message= 'This code is not set'

                    if (data[o] == null ){
                        status = 'not-active'
                        message= 'This code is not set'
                    }else if (data[0].length > 0){
                     status = 'active'
                        message= 'This code is set'
                    }
                    new_result1.push({
                        "id": y.id,
                        "name": y.name,
                        "status": status,
                        "messege" : message,
                        "created_at":y.created_at,
                        "updated_at":y.updated_at,
                    })
                    o+=1
                })
                let totalPage = Math.ceil(result.count / perPage);
                let dataResult = resp.paging(new_result1, parseInt(showPageResult), parseInt(perPageResult), totalPage, result.count);
                resp.ok(true, "Get list data sector.", dataResult, res);
            })
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
        var new_result = [];
        var new_result1 = [];

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
        .then(result => {
            result.rows.map(data =>{
                new_result.push(formula.findAll({
                    where: {
                        level: 'line',
                        level_reference_id: data.id,
                        is_active : true
                    },
                    attributes:['is_active']
                }))
            })
            Promise.all(new_result)
            .then(data =>{
                // return console.log(data[1].length)
                let o = 0
                result.rows.map(y =>{
                    var status = 'not-ctive'
                    var message= 'This code is not set'

                    if (data[o].length == 0 ){
                        status = 'not-active'
                        message= 'This code is not set'
                    }else if (data[0].length > 0){
                        status = 'active'
                        message= 'This code is set'
                    }
                    new_result1.push({
                        "id": y.id,
                        "name": y.name,
                        "sector_id": y.sector_id,
                        "created_at": y.created_at,
                        "updated_at": y.updated_at,
                        "status": status,
                        "messege" : message,
                        "sector": {
                            "id": y.sector.dataValues.id,
                            "name": y.sector.dataValues.name,
                            "created_at": y.sector.dataValues.created_at,
                            "updated_at": y.sector.dataValues.updated_at
                        }
                    })
                    o+=1
                })
                // return res.json(new_result1)
                let totalPage = Math.ceil(result.count / perPage);
                let dataResult = resp.paging(new_result1, parseInt(showPageResult), parseInt(perPageResult), totalPage, result.count);
                resp.ok(true, "Get list data line.", dataResult, res);
            })
            
            
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
        var new_result = [];
        var new_result1 = [];

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
        .then(result => {
            // return res.json(result)
            result.rows.map(data =>{
                new_result.push(formula.findAll({
                    where: {
                        level: 'plant',
                        level_reference_id: data.id,
                        is_active : true,
                    },
                    attributes:['is_active']
                }))
            })
            Promise.all(new_result)
            .then(data =>{
                // return res.json(data)
                let o = 0
                result.rows.map(y =>{
                    var status = 'not-ctive'
                    var message= 'This code is not set'

                    if (data[o].length == 0 ){
                        status = 'not-active'
                        message= 'This code is not set'
                    }else if (data[0].length > 0){
                        status = 'active'
                        message= 'This code is set'
                    }
                    new_result1.push({
                        "id": y.id,
                        "factory_name": y.factory_name,
                        "created_at": y.created_at,
                        "updated_at": y.updated_at,
                        "status": status,
                        "messege" :message,
                    })
                    o+=1
                })
                let totalPage = Math.ceil(result.count / perPage);
                let dataResult = resp.paging(new_result1, parseInt(showPageResult), parseInt(perPageResult), totalPage, result.count);
                resp.ok(true, "Get list data plant.", dataResult, res);
            })
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