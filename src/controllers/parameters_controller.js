const parameters_index = require('../models').parameters;

const Sequelize = require('sequelize');
const Op = Sequelize.Op
module.exports = {
    create(req,res){
        return parameters_index
        .create({
            name : req.body.name, 
            parameter_category_id : req.body.parameter_category_id, 
            group : req.body.group, 
            level : req.body.level, 
            type : req.body.type, 
            configuration : req.body.configuration
        })
        .then(data => res.status(201).send(data))
        .catch(err => res.status(400).send(err))
    },

    update(req,res){
        return parameters_index
        .findOne({
            attributes:['id','name','parameter_category_id','group','level','configuration','type','createdAt','updatedAt'],
            where : {
                id : req.params.id
            }
        })
        .then(resultParameter=>{
            return resultParameter.update({
                name : req.body.name || resultParameter.name,
                parameter_category_id : req.body.parameter_category_id || resultParameter.parameter_category_id, 
                group : req.body.group || resultParameter.group, 
                level : req.body.level || resultParameter.level, 
                type : req.body.type || resultParameter.type, 
                configuration : req.body.configuration || resultParameter.configuration,
                updatedAt: new Date()
            })
        })
        .then(data => res.json(data))
        .catch(err =>res.json(err))
    },
    destroy(req,res){
        return parameters_index
        .findOne({
            attributes:['id','name','group','level','configuration','type'],
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
        .catch(err =>res.json(err))

    },

    list(req,res){
        let orderBy = 'createdAt';
        let sortBy = 'desc';
        let page = 1;
        let perPage = 10;
        // let searchQuery = [];
        // let options = {};
        // let parameterOptions = {};
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

        let skip = (page - 1) * perPage
        parameters_index.findAll({
            attributes:['id','name','parameter_category_id','group','level','configuration','type','createdAt','updatedAt'],
            order: [
                [orderBy, sortBy]
            ],
            where : {
                parameter_category_id : {
                    [Op.and]: {
                        [Op.eq]: req.query.category_id,
                        [Op.ne]: null
                    }
                }
            }
        }).then(result_parameter => {
            res.json(result_parameter)
        }).catch (err=> res.send(err))
   
    },

    search(req,res){
    return parameters_index
    .findOne({
        attributes:['id','name','group','level','configuration','type'],
        where : {
            id : req.params.id,
        }
    }).then(data => resp.ok(data))
    .catch(err =>res.json(err))
    }
};