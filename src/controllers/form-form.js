const FormUser = require('../models').user;
const FormForm = require('../models').form_form;
const FormSubCategory = require('../models').form_sub_category;
const FormCategory = require('../models').form_category;
const FormField = require('../models').form_field;
const FormResponse = require('../models').form_response;
const FormResponseField = require('../models').form_response_field;
const resp = require('../views/response');
const pagination = require('../utils/pagination');
// const pagination = require('../utils/pagination')//
// console.log(Object.keys(require('../models')));
const Sequelize = require('sequelize');
const Op = Sequelize.Op
module.exports = {

    list(req, res){
        let orderBy = 'createdAt'
        let sortBy = 'Asc'
        let page = 1;
        let perPage = 10;
        let type = ['non-widget','widget']
        let filForm ={};
        let options = {};
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
        if ((req.query.sub_category != undefined) && (req.query.sub_category.length > 0)) {
            options.sub_category = Sequelize.where(Sequelize.col('sub_category.id'), '=', req.query.sub_category);
        }
        if ((req.query.category != undefined) && (req.query.category.length > 0)) {
            options.category = Sequelize.where(Sequelize.col('sub_category.form_category_id'), '=', req.query.category);
        }
        if ((req.query.search != undefined) && (req.query.search.length > 0)){
            filForm.name = Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('form_form.name')), 'LIKE', '%' + req.query.search.toLowerCase() + '%');
        }
        if(req.query.type != undefined && req.query.type .length >0){
            type = req.query.type
            filForm.type = Sequelize.where(Sequelize.col('types'), '=', type);
        }
        filForm.is_template = Sequelize.where(Sequelize.col('is_template'), '=', 'false');

        let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);

        ////////// filter by category
        var cat = {
            model: FormCategory,
            as: 'category',
            attributes: ['id','name'],
        }
        /////////// filter by sub category
        var subCat = {
            model: FormSubCategory,
            as: 'sub_category',
            where: options,
            attributes: ['id','name'],
            include: [cat]
        }
        
        return  FormForm
        .findAndCountAll({
        include: [subCat],
        attributes : ['id','name','sub_category_id','types','is_template','createdAt','updatedAt'],
        order: [
            [orderBy, sortBy]
        ],
        limit: perPageResult,
        offset :offsetResult,
        where: filForm
        })
        .then(result => {
            let totalPage = Math.ceil(result.count / perPage);
            let data = resp.paging(result.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, result.count);
            resp.ok2(data, res)
        })
        .catch((error) => {
            resp.ok(false, "Failed get list data form.", null, res.status(400));
            console.log(error);
        });

    },

    listTemplate(req, res){
        let orderBy = 'createdAt'
        let sortBy = 'Asc'
        let page = 1;
        let perPage = 10;
        let options = {};
        let filForm ={};
        let type = ['non-widget','widget']
        if(req.query.order_by != undefined){
            orderBy = req.query.order_by
        }
        if(req.query.sort_by != undefined){
            sortBy = req.query.sort_by
        }
        if(req.query.page != undefined && (req.query.page.length > 0)){
            page = req.query.page
        }
        if(req.query.per_page != undefined && (req.query.per_page.length > 0)){
            perPage = req.query.per_page
        }
        
        // if ((req.query.type != undefined) && (req.query.type.length > 0)) {
        //     options.type = Sequelize.where(Sequelize.col('form_forms.types'), '=', req.query.type);
        // }
        if ((req.query.sub_category != undefined) && (req.query.sub_category.length > 0)) {
            options.sub_category = Sequelize.where(Sequelize.col('sub_category.id'), '=', req.query.sub_category);
        }
        if ((req.query.category != undefined) && (req.query.category.length > 0)) {
            options.category = Sequelize.where(Sequelize.col('sub_category.form_category_id'), '=', req.query.category);
        }
        if ((req.query.search != undefined) && (req.query.search.length > 0)){
            filForm.name = Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('form_form.name')), 'LIKE', '%' + req.query.search.toLowerCase() + '%');
        }
        if(req.query.type != undefined && req.query.type .length >0){
            type = req.query.type
            filForm.type = Sequelize.where(Sequelize.col('types'), '=', type);
        }
        filForm.is_template = Sequelize.where(Sequelize.col('is_template'), '=', 'true');
        

        let { offsetResult, perPageResult, showPageResult } = pagination.builder(perPage, page);

        ////////// filter by category
        var cat = {
            model: FormCategory,
            as: 'category',
            attributes: ['id','name'],
        }
        /////////// filter by sub category
        var subCat = {
            model: FormSubCategory,
            as: 'sub_category',
            where: options,
            attributes: ['id','name'],
            include: [cat],    
        }
        return  FormForm
        .findAndCountAll({
        include: [subCat],
        attributes : ['id','name','sub_category_id','types','is_template','createdAt','updatedAt'],
        order: [
            [orderBy, sortBy]
        ],
        limit: perPageResult,
        offset :offsetResult,
        where: filForm
        })
        .then(result => {
            let totalPage = Math.ceil(result.count / perPage);
            let data = resp.paging(result.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, result.count);
            resp.ok2(data, res);
        })
        .catch((error) => {
            resp.ok(false, "Failed get list data form template.", null, res.status(400));
            console.log(error);
        });

    },

    show(req, res){
        var form_field =  FormField.findAll({
                            attributes: ['id','form_id',['types','type'],'configuration','is_required','order'],
                            where: {
                                'form_id' : req.params.id
                            }
                        })

        FormForm.findByPk(req.params.id,{
            attributes:['id','name','types','is_template'],
        })
        .then(result=>{
            form_field.then(result2=>{

                let data = {
                    'form': result,
                    'form_field' : result2
                }

                res.json(data)
            })
        })
        .catch(err =>{
            res.status(400).send(err);
        })
        
        // Promise.all([form_list,form_field])
        // .then(function(values) {
        //     res.json(values)
        // })
        // .catch(err =>{
        //     res.status(400).send(err);
        // })
    },

    create(req,res){
        // console.log('ok')
        if(req.body.type != 'non-widget' && req.body.type != 'widget' ){
            resp.ok(false, `unknown type`, null, res.status(400));
        }
        return FormForm
        .create({
            sub_category_id: req.body.sub_category,
            name: req.body.name,
            types: req.body.type,
            is_template: "false"
        })
        .then(created => res.status(201).send(created))
        .catch(error => res.status(400).send(error));
    },

    update(req,res){
        return FormForm
        .findOne({
            attributes : ['id','sub_category_id','name','types','is_template','createdAt','updatedAt'],
            where: {
                id : req.params.id
            },
        })
        .then((FormForm)=>{
            return FormForm.update({
                name: req.body.name || FormForm.name,
                sub_category_id: req.body.sub_category_id || FormForm.sub_category_id,
                types: req.body.type || FormForm.types,
                is_template: req.body.is_template || FormForm.is_template,
                updatedAt :new Date(),
            })
        })
        .then(update => res.status(201).send(update))
        .catch(error => res.status(400).send(error));
    },

    async delete(req,res){
        let transaction
        var field_id = []
        let formId = req.params.id
        try {
            await FormField.findAll({
                attributes:['id'],
                where: {form_id : formId},
            })
            .then(result => {
                for(i=0;i < result.length; i++){
                    field_id.push(result[i].id)
                }
                // console.log(field_id)
            })
            // transaction = await sequelize.transaction();
            ////
            await FormForm.destroy({
                where : { id : formId }, transaction
            })
            ////
            await FormField.destroy({
                where :{ form_id : formId }, transaction
            })
            ////
            await FormResponse.destroy({
                where : {form_id : formId}
            })
            ////
            await FormResponseField.destroy({ where: { form_field_id: {[Op.in] : field_id} }})
            await transaction.commit()
            
            if (transaction.finished === 'commit') { res.status(200).res.json('success delete') }
        } catch (error) {
            if (transaction) await transaction.rollback();
        }
    },
    
    search(req,res){
        var subCat = {
            model: FormSubCategory,
            as: 'sub_category',
            attributes: ['name'],
        }
        return FormForm.findAll({
            include: [subCat],
            attributes : ['id','sub_category_id','name','types','is_template','createdAt','updatedAt'],
            where: {
                name : {
                    [Op.like] : '%'+req.query.name+'%'
                }
            }
        })
        .then(data => res.status(201).send(data))
        .catch(error => res.status(400).send(error));
        
    }

}