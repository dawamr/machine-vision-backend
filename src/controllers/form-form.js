const FormUser = require('../models').user;
const FormForm = require('../models').form_form;
const FormSubCategory = require('../models').form_sub_category;
const FormCategory = require('../models').form_category;
const FormField = require('../models').form_field;
const FormResponse = require('../models').form_response;
const FormResponseField = require('../models').form_response_field;

// console.log(Object.keys(require('../models')));
const Sequelize = require('sequelize');
const Op = Sequelize.Op
module.exports = {

    list(req, res){
        let orderBy = 'createdAt'
        let sortBy = 'Asc'
        let page = 1;
        let perPage = 10;
        let type = ['widget','non-widget']
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
        if(req.query.type != undefined){
            type = req.query.type
        }

        ////////// filter by category
        var cat = {
            model: FormCategory,
            as: 'category',
            attributes: ['name'],
        }
        if (req.query.filter_cat != undefined) {
            cat.where = {
                id: req.query.filter_cat
            }
        }
        /////////// filter by sub category
        var subCat = {
            model: FormSubCategory,
            as: 'sub_category',
            attributes: ['name'],
            include: [cat]
        }
        if (req.query.filter_sub_cat != undefined) {
            subCat.where = {
                'id': req.query.filter_sub_cat
            }
        }
        
        
        return  FormForm
        .findAll({
        include: [subCat],
        attributes : ['id','name','sub_category_id','types','is_template','createdAt','updatedAt'],
        order: [
            [orderBy, sortBy]
        ],
        limit: perPage,
        offset :skip,
        where: {'types': type}
        })
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(error));

    },

    show(req, res){
        var form_field =  FormField.findAll({
                            attributes: ['id','form_id','types','configuration','is_required','order'],
                            where: {
                                'form_id' : req.params.id
                            }
                        })

        var form_list =  FormForm.findOne({
                            attributes:['id','name','types','is_template'],
                            where: {
                                'id' : req.params.id
                            }
                        })
        
        Promise.all([form_list,form_field])
        .then(function(values) {
            res.json(values)
        })
        .catch(err =>{
            res.status(400).send(err);
        })
    },

    create(req,res){
        // console.log('ok')
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

    delete(req,res){
        return FormForm
        .findOne({
            attributes: ['id','sub_category_id','name','types','is_template','createdAt','updatedAt'],
            where: {
                id : req.params.id
            },
        })
        .then((FormForm)=>{
            return FormForm.destroy()
        })
        .then(data => res.status(201).send(data))
        .catch(error => res.status(400).send(error));
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