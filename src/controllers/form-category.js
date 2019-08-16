const FormCategory = require('./../models/').form_category;

// console.log(Object.keys(require('../models')));
const Sequelize = require('sequelize');
const Op = Sequelize.Op
module.exports = {
    
    list(req, res) {
        let orderBy = 'createdAt'
        let sortBy = 'Asc'
        let limits = 1
        let offset  = 1
        if(req.query.order_by != undefined){
            orderBy = req.query.order_by
        }
        if(req.query.sort_by != undefined){
            sortBy = req.query.sort_by
        }
        if(req.query.limit != undefined){
            limits = req.query.limit
        }
        if(req.query.offset != undefined){
            offset = req.query.offset
        }
        return FormCategory
        .findAll({
        order: [
            [orderBy, sortBy]
        ],
        limit: limits,
        offset :offset
        })
        .then(list => res.status(200).send(list))
        .catch(error => res.status(400).send(error));
    },

    create(req,res){
        return FormCategory
        .create({
          name: req.body.name,
        })
        .then(Category => res.status(201).send(Category))
        .catch(error => res.status(400).send(error));
    },

    update(req,res){
        return FormCategory
        .findOne({
            where: {
                id : req.params.id
            },
        })
        .then((FormCategory)=>{
            return FormCategory.update({
                name: req.body.name || FormCategory.name,
                updatedAt :new Date(),
            })
        })
        .then(Category => res.status(201).send(Category))
        .catch(error => res.status(400).send(error));
    },

    delete(req,res){
        return FormCategory
        .findOne({
            where: {
                id : req.params.id
            },
        })
        .then((FormCategory)=>{
            return FormCategory.destroy()
        })
        .then(Category => res.status(201).send(Category))
        .catch(error => res.status(400).send(error));
    },

    //stuck deleteAt not visible
    // restore(req,res){
    //     return FormCategory
    //     .findOne({
    //         where: {
    //             id : req.params.id
    //         },
    //     })
    //     .then((FormCategory)=>{
    //         console.log(FormCategory)
    //         // return FormCategory.restore()
    //     })
    //     .then(Category => res.status(201).send(Category))
    //     .catch(error => res.status(400).send(error));
    // },

    search(req,res){
        console.log(req.body.name)
        return FormCategory
        .findAll({
            order: [
                ['name', 'Asc']
            ],
            where: {
                name : {
                    [Op.like] : '%'+req.body.name+'%'
                }
            },
        })
        .then(search => res.status(201).send(search))
        .catch(error => res.status(400).send(error));
    }
    
    
};