const FormCategory = require('./../models/').form_category;
const FormSubCategory = require('./../models/').form_sub_category;

// console.log(Object.keys(require('../models')));
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
module.exports = {
    
    listAll(req, res) {
        let orderBy = 'createdAt';
        let sortBy = 'desc';
        let page = 1;
        let perPage = 10;
        let options = {}
        
        if(req.query.order_by != undefined && req.query.order_by.length >0){
            orderBy = req.query.order_by
        }
        if(req.query.sort_by != undefined && req.query.sort_by.length >0){
            sortBy = req.query.sort_by
        }
        if(req.query.page != undefined && req.query.page.length >0){
            page = req.query.page
        }
        if(req.query.per_page != undefined && req.query.per_page.length >0){
            perPage = req.query.per_page
        }
        if ((req.query.search != undefined) && (req.query.search.length > 0)){
            options.name = Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('form_category.name')), 'LIKE', '%' + req.query.search.toLowerCase() + '%');
        }
        let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);

        return FormCategory
        .findAndCountAll({
        order: [
            [orderBy, sortBy]
        ],
        where: options,
        limit: perPageResult,
        offset :offsetResult
        })
        .then(result => {
            let totalPage = Math.ceil(result.count / perPage);
            let data = resp.paging(result.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, result.count);
            resp.ok2(data, res)
        })
        .catch((error) => {
            resp.ok(false, "Failed get list data form category.", null, res.status(400));
            console.log(error);
        });
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
        // if(req.body.name == null){res.status(400).send(res.json({status:'name is required'}))}
        return FormCategory
        .create({
          name: req.body.name,
        })
        .then(data => res.status(201).send(data))
        .catch(error => res.status(400).send(res.json(error)));
    },

    update(req,res){
        // if(!req.body.name){return res.status(400).send(res.json({status:'name is required'}))}
        FormCategory.update({
            name: req.body.name,
            updatedAt :new Date(),
        }, {
            where: {
            id: req.params.id
            }
        })

        FormCategory.findByPk(req.params.id)
        .then(result => {
            resp.ok(true, `Success update form category`, result, res);
        })
        .catch((error) => {
            resp.ok(false, `Cannot update form category`, null, res.status(400));
            console.log(error);
        });
        
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