const FormSubCategory = require('./../models/').form_sub_category;
const FormCategory = require('./../models/').form_category;
const Sequelize = require('sequelize');
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const Op = Sequelize.Op
module.exports = {

    list(req, res) {
        let orderBy = 'createdAt'
        let sortBy = 'Asc'
        let page = 1;
        let perPage = 10;
        let options = {};
        // let category_id
        if(req.query.order_by != undefined && req.query.order_by.length >0 ){
            orderBy = req.query.order_by
        }
        if(req.query.sort_by != undefined && req.query.sort_by .length >0){
            sortBy = req.query.sort_by
        }
        if(req.query.page != undefined && req.query.page .length >0){
            page = req.query.page
        }
        if(req.query.per_page != undefined && req.query.per_page .length >0){
            perPage = req.query.per_page
        }
        if ((req.query.category_id != undefined) && (req.query.category_id.length > 0)) {
            options.category_id = Sequelize.where(Sequelize.col('category.id'), '=', req.query.category_id);
        }
        if ((req.query.search != undefined) && (req.query.search.length > 0)){
            options.name = Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('form_sub_category.name')), 'LIKE', '%' + req.query.search.toLowerCase() + '%');
        }
        var cat = {
            model: FormCategory,
            as: 'category',
            where: options,
            attributes : ['id','name','createdAt','updatedAt'],
        }
        let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);
        return FormSubCategory
        .findAndCountAll({
        include: [cat],
        attributes : ['id','form_category_id' ,'name','createdAt','updatedAt'],
        order: [
            [orderBy, sortBy]
        ],  
        limit: perPageResult,
        offset :offsetResult
        })
        .then(result => {
            let totalPage = Math.ceil(result.count / perPage);
            let data = resp.paging(result.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, result.count);
            resp.ok2(data, res)
        })
        .catch((error) => {
            resp.ok(false, "Failed get list data form sub category.", null, res.status(400));
            console.log(error);
        });
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
                form_category_id : req.body.category_id || FormSubCategory.form_category_id,
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