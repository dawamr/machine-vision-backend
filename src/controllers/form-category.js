const FormCategory = require('./../models/').form_category;
const FormSubCategory = require('./../models/').form_sub_category;

// console.log(Object.keys(require('../models')));
const Sequelize = require('sequelize');
const Op = Sequelize.Op
module.exports = {
    
    listAll(req, res) {
        let orderBy = 'createdAt';
        let sortBy = 'desc';
        let page = 1;
        let perPage = 10;
        
        if(req.query.order_by != undefined){
            orderBy = req.query.order_by
        }
        if(req.query.sort_by != undefined){
            sortBy = req.query.sort_by
        }
        if(req.query.page != undefined){
            page = req.query.page
        }
        if(req.query.per_page != undefined){
            perPage = req.query.per_page
        }
        let skip = (page - 1) * perPage
        return FormCategory
        .findAll({
        order: [
            [orderBy, sortBy]
        ],
        limit: perPage,
        offset :skip
        })
        .then(data => {
            res.json(data)
        })
        .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        let orderBy = 'createdAt';
        let sortBy = 'desc';
        let page = 1;
        let perPage = 10;
        
        if(req.query.order_by != undefined){
            orderBy = req.query.order_by
        }
        if(req.query.sort_by != undefined){
            sortBy = req.query.sort_by
        }
        if(req.query.page != undefined){
            page = req.query.page
        }
        if(req.query.per_page != undefined){
            perPage = req.query.per_page
        }
        let skip = (page - 1) * perPage
        return FormCategory
        .findByPk(req.params.id,{
            attributes :['name','createdAt','updatedAt']
        })
        .then(data => {
            return FormSubCategory.findAll({
                attributes:['id','name','form_category_id','createdAt','updatedAt'],
                where:{
                    form_category_id:req.params.id
                }
            }).then(result=> {
                Promise.all([data,result]).then(function(values) {
                    res.json(values)
                });
            })
        })
        .catch(error => res.status(400).send(error));
    },
    
    create(req,res){
        if(req.body.name == null){res.status(400).send(res.json({status:'name is required'}))}
        return FormCategory
        .create({
          name: req.body.name,
        })
        .then(data => res.status(201).send(data))
        .catch(error => res.status(400).send(res.json(error)));
    },

    update(req,res){
        if(req.body.name){return res.status(400).send(res.json({status:'name is required'}))}
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
        .then(data => res.status(201).send(data))
        .catch(error => res.status(400).send(error));
    },

    delete(req,res){
        var category  = FormCategory.destroy({
            where: {
                id : req.params.id
            },
        })
        var sub_category  = FormSubCategory.destroy({
            attributes:['id','name','form_category_id','createdAt','updatedAt'],
            where: {
                form_category_id : req.params.id
            },
            truncate: true
        })

        Promise.all([category,sub_category])
        .then(function(values) {
            res.json({status: "success-deleted"})
        }).catch(err=>{
            res.status(400).send(err);
            // res.json(err)
        })
        
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
        console.log(req.query.name)
        return FormCategory
        .findAll({
            order: [
                ['name', 'Asc']
            ],
            where: {
                name : {
                    [Op.like] : '%'+req.query.name+'%'
                }
            },
        })
        .then(data => res.status(201).send(data))
        .catch(error => res.status(400).send(error));
    }
    
    
};