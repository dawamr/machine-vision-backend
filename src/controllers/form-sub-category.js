const FormSubCategory = require('./../models/').form_sub_category;
const FormCategory = require('./../models/').form_category;
const Sequelize = require('sequelize');
const Op = Sequelize.Op
module.exports = {

    list(req, res) {
        let orderBy = 'createdAt'
        let sortBy = 'Asc'
        let limits = 10
        let offset  = 0
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
        var cat = {
            model: FormCategory,
            as: 'category',
            attributes : ['id','name','createdAt','updatedAt'],
        }
        if(req.query.filter != undefined){
            cat.where = {
                'id': req.query.filter
            }
        }
        
        return FormSubCategory
        .findAll({
        include: [cat],
        attributes : ['id','form_category_id' ,'name','createdAt','updatedAt'],
        order: [
            [orderBy, sortBy]
        ],  
        limit: limits,
        offset :offset
        })
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(error));
    },

    create(req,res){
        return FormSubCategory
        .create({
          name: req.body.name,
          form_category_id: req.body.category_id,
        })
        .then(data => res.status(201).send(data))
        .catch(error => res.status(400).send(error));
    },

    update(req,res){
        return FormSubCategory
        .findOne({
            attributes : ['id','form_category_id' ,'name','createdAt','updatedAt'],
            where: {
                id : req.params.id
            },
        })
        .then((FormSubCategory)=>{
            return FormSubCategory.update({
                name: req.body.name || FormSubCategory.name,
                updatedAt :new Date(),
            })
        })
        .then(data => res.status(201).send(data))
        .catch(error => res.status(400).send(error));
    },

    delete(req,res){
        return FormSubCategory
        .findOne({
            attributes: ['id','name'],
            where: {
                id : req.params.id
            },
        })
        .then((data)=>{
            return data.destroy()
        })
        .then(data => res.status(201).send(data))
        .catch(error => res.status(400).send(error));
    },

    search(req,res){
        return FormSubCategory
        .findAll({
            include: 'category',
            attributes : ['id','form_category_id' ,'name','createdAt','updatedAt'],
            where: {
                name : {
                    [Op.like] : '%'+req.query.name+'%'
                }
            },
            order: [
                ['name', 'Asc']
            ],
        })
        .then(data => res.status(201).send(data))
        .catch(error => res.status(400).send(error));
    },

}