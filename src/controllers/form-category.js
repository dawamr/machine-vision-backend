var Sequelize = require('sequelize');
const FormCategory = require('./../models/').form_category;
const Op = Sequelize.Op;
// console.log(Object.keys(require('../models')));

module.exports = {
    list(req, res) {
        return FormCategory
        .findAll({
        include: [],
        order: [
            ['createdAt', 'DESC'],
            ],
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

    // search(req,res){
    //     return FormCategory
    //     .findOne({
    //         where: {
    //             name : {
    //                 [Op.like] : '%Da'
    //             }
    //         },
    //     })
    //     .then(Category => res.status(201).send(Category))
    //     .catch(error => res.status(400).send(error));
    // }
    
    
};