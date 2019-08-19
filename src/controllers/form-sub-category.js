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
        .then(list => res.status(200).send(list))
        .catch(error => res.status(400).send(error));
    },

    create(req,res){
        return FormSubCategory
        .create({
          name: req.body.name,
          form_category_id: req.body.category_id,
        })
        .then(create => res.status(201).send(create))
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
        .then(update => res.status(201).send(update))
        .catch(error => res.status(400).send(error));
    },

    delete(req,res){
        const deleteThis= FormSubCategory.destroy({ where: {
            id: req.params.id
        }})
        if (deleteThis) {
            res.json({
                'status': 'OK',
                'messages': 'User berhasil dihapus',
                'data': deleteThis,
            })
        }
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
        .then(search => res.status(201).send(search))
        .catch(error => res.status(400).send(error));
    },

}