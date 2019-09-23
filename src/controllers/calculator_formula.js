// console.log(Object.keys(require('../models')));
const formula = require('../models').calculator_formula;
const formula_parameter = require('../models').calculator_formula_parameter;
const sector = require('../models').sector;
const line = require('../models').line;
const proses_machine = require('../models').process_machine;
const proses = require('../models').process;
const machine = require('../models').machine;

const Sequelize = require('sequelize');
const Op = Sequelize.Op

module.exports = {

    listAll(req, res){
        let page = 1;
        let perPage = 10;
        let skip = (page - 1) * perPage
        line.findAll({
            attributes:[['id','line_id'],['name','line_name']],
            include: [{
                model: sector,
              }],
            limit: perPage,
            offset :skip
        })
        .then(result => res.status(201).send(result))
        .catch(error => res.status(400).send(error));
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
            oroptionsder: [
                [orderBy, sortBy]
            ],
            where : options,
            limit: perPage,
            offset :skip
        })
        .then(result => res.status(201).send(result))
        .catch(error => res.status(400).send(error));
    },
    script(req,res){
        let var_formula = {
            model: formula,
            as: 'formula',
            attributes: [['id','formula_id'],'level','level_reference_id','formula_script','formula_xml','createdAt','updatedAt'],
        }
        formula_parameter.findAll({
            attributes:['id','parameter_id','formula_id'],
        })
        .then(result => res.status(201).send(result))
        .catch(error => res.status(400).send(error));
    }

}