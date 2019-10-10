const formula = require('../models').calculator_formula;
const sector = require('../models').sector;
const line = require('../models').line;
const process_machine = require('../models').process_machine;
const process = require('../models').process;
const machine = require('../models').machine;

const Sequelize = require('sequelize');
const Op = Sequelize.Op

module.exports = {

    listAll(req, res){
        // .then(result => res.status(201).send(result))
        // .catch(error => res.status(400).send(error));
        let new_result = [];
        let s = {
            model: sector,
            attributes: [['id','id_sector'],['name','sector_name']],
        }
        let l = {
            model: line,
            attributes: [['id','id_line'],['name','line_name'],['sector_id','line_sector_id']],
        }
        let p = {
            model: process,
            attributes: [['id','id_process'],['name','name_process'],['line_id','process_line_id']],
            include: [l]
        }
        let pm = {
            model: process_machine,
            include:[p],
            attributes: [['id','id_process_machine'],['process_id','pm_process_id'],['machine_id','pm_machine_id']],
        }
        machine.findAll({
            attributes:[['id','id_machine'],['name','machine_name']],
            include: [pm]
        })
        .then(result => {
            // var test = Object.keys(result).map((key)=>{
            //     return [Number(key), result[key]]
            // })
            // for (let index = 0; index < test.length; index++) {
            //     test[index].push({"cal_name": `Calculator Machine ${result[0].dataValues.id_machine}`})
            // }
            result.map(data =>{
                console.log(data.dataValues)
                new_result.push({"machine_id" : data.dataValues.id_machine,"machine_name" : data.dataValues.machine_name})
            })
            return res.json(result)
            res.json(new_result)
        })
        .catch(error => res.status(400).send(error));
    },

    list(req, res){
        let orderBy = 'created_at';
        let sortBy = 'desc';
        let page = 1;
        let perPage = 10;
        let options = {};
        let required = false;
        // let sensors = sensor.findAll({})
        // let lines = line.findAll({})
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
        // Promise.all([sensors,lines])
        // .then(result => res.status(201).send(result))
        // .catch(error => res.status(400).send(error));
    }

}