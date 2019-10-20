const parameters_index = require('../models').parameters;
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
    create(req,res){
            // let t =req.body.type
            // if(t !='initial' && t !='constant', t !='manufacture' ||t !='kpi'|| t !='predictive'|| t !='alarm'){
            //     return res.status(400).res.send(`missing type : ${t}`)
            // }
        let dc = req.body.data_class
        if(dc != 'quality' && dc !='asset' && dc !='maintenance' && dc !='human' && dc !='productivity'&& dc !='finance'){
            return res.status(400).send(`missing data class  : ${req.body.data_class}`)
        }
        console.log(req.body.data_class)
        return parameters_index
        .create({
            name : req.body.name, 
            parameter_category_id : req.body.parameter_category_id, 
            group : req.body.group, 
            level : req.body.level, 
            type : req.body.type, 
            data_class: req.body.data_class,
            configuration : req.body.configuration
        })
        .then(data => res.status(201).send(data))
        .catch(err => res.status(400).send(err))
    },

    update(req,res){
        return parameters_index
        .findOne({
            attributes:['id','name','parameter_category_id','group','data_class','level','configuration','type','createdAt','updatedAt'],
            where : {
                id : req.params.id
            }
        })
        .then(resultParameter=>{
            // let t =req.body.type
            // if(t !='initial' && t !='constant' && t !='manufacture' &&t !='kpi'&& t !='predictive'&& t !='alarm'){
            //     return res.status(400).res.send(`missing type : ${t}`)
            // }
            let dc =req.body.data_class
            if(dc !='quality' && dc !='asset' && dc !='maintenance' && dc !='human'&& dc !='productivity'&& dc !='finance'){
                return res.status(400).res.send(`missing data class  : ${dc}`)
            }
            return resultParameter.update({
                name : req.body.name || resultParameter.name,
                parameter_category_id : req.body.parameter_category_id || resultParameter.parameter_category_id, 
                group : req.body.group || resultParameter.group, 
                level : req.body.level || resultParameter.level,
                data_class: req.body.data_class|| resultParameter.data_class, 
                type : req.body.type || resultParameter.type, 
                configuration : req.body.configuration || resultParameter.configuration,
                updatedAt: new Date()
            })
        })
        .then(data => res.json(data))
        .catch(error => res.status(400).send(error));
    },
    destroy(req,res){
        return parameters_index
        .findOne({
            attributes:['id','name','parameter_category_id','group','data_class','level','configuration','type','createdAt','updatedAt'],
            where : {
                id : req.params.id
            }
        })
        .then(parameter=>{
            return parameter.destroy({
                name: req.body.name || parameter.name,
                deletedAt: new Date()
            })
        })
        .then(data => res.json(data))
        .catch(error => res.status(400).send(error));

    },

    list(req,res){
        let orderBy = 'createdAt';
        let sortBy = 'desc';
        let page = 1;
        let perPage = 10;
        let options = {};
        // let parameterOptions = {};
        let required = false;
        if ((req.query.order_by != undefined) && (req.query.order_by.length > 0)) {
            orderBy = req.query.order_by;
        }
        if ((req.query.sort_by != undefined) && (req.query.sort_by.length > 0)) {
            sortBy = req.query.sort_by;
        }
        if ((req.query.category_id != undefined) && (req.query.category_id.length > 0)){
            options.parameter_category_id = sequelize.where(sequelize.col('parameter_category_id'), '=', req.query.category_id );
            required = true;
        }
        if ((req.query.group != undefined) && (req.query.group.length > 0)){
            options.group = sequelize.where(sequelize.col('group'), '=', req.query.group );
            required = true;
        }
        if ((req.query.data_class != undefined) && (req.query.data_class.length > 0)){
            options.data_class = sequelize.where(sequelize.col('data_class'), '=', req.query.data_class );
            required = true;
        }
        if ((req.query.level != undefined) && (req.query.level.length > 0)){
            options.level = sequelize.where(sequelize.col('level'), '=', req.query.level );
            required = true;
        }
        // console.log(req.query.category_id)
        let skip = (page - 1) * perPage
        if(req.query.category_id != undefined){
            return parameters_index.findAll({
                attributes:['id','name','parameter_category_id','group','data_class','level','configuration','type','createdAt','updatedAt'],
                order: [
                    [orderBy, sortBy]
                ],
                where : options,
                limit: perPage,
                offset :skip
            }).then(result_parameter => {
                res.json(result_parameter)
            })
            .catch(error => res.status(400).send(error));
        }
        return parameters_index.findAll({
            attributes:['id','name','parameter_category_id','group','data_class','level','configuration','type','createdAt','updatedAt'],
            order: [
                [orderBy, sortBy]
            ],
        }).then(result_parameter => {
            res.json(result_parameter)
        })
        .catch(error => res.status(400).send(error));
    },

    search(req,res){
    return parameters_index
    .findOne({
        attributes:['id','name','parameter_category_id','group','data_class','level','configuration','type','createdAt','updatedAt'],
        where : {
            id : req.params.id,
        }
    }).then(data => resp.ok(data))
    .catch(error => res.status(400).send(error));
    }
};