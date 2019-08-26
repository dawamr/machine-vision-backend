const parameters_index = require('../models').parameters;

module.exports = {
    create(req,res){
        return parameters_index
        .create({
            name : req.body.name
        }
        )
        .then(data => res.status(201).send(data))
        .catch(err => res.status(400).send(err))
    },
    update(req,res){
        return parameters_index
        .findOne({
            attributes:['id','name'],
            where : {
                id : req.params.id
            }
        })
        .then(parameter=>{
            return parameter.update({
                name: req.body.name || parameter.name,
                updatedAt: new Date()
            })
        })
        .then(data => res.json(data))
        .catch(err =>res.json(err))
    },
    destroy(req,res){
        return parameters_index
        .findOne({
            attributes:['id','name'],
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
        let orderBy = 'createdAt'
        let sortBy = 'asc'
        if(req.query.order_by != undefined){
            orderBy = req.query.order_by
        }
        if(req.query.sort_by != undefined){
            sortBy = req.query.sort_by
        }
        
        return parameters_index.findAll({
            attributes: ['id','name'],
            include: ['parameter_category']
        })
        .then(data => res.json(data))
        .catch(err => res.json(err))
    },

    search(req,res){
    return parameters_index
    .findOne({
        attributes:['id','name'],
        where : {
            id : req.params.id
        }
    }).then(data => res.json(data))
    .catch(err =>res.json(err))
    }
};