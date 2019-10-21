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
        /////////// Model User
        var pegawai = {
            model: FormUser,
            as: 'user',
            attributes: ['id','name']
        }
        /////////// Model Category
        var category = {
            model: FormCategory,
            as: 'category',
            attributes: ['id','name']
        }

        /////////// Model Form Sub Category
        var sub_category = {
            model: FormSubCategory,
            as: 'sub_category',
            attributes: ['id','form_category_id' ,'name'],
            include: [category]
        }
        /////////// Model Form List
        var form_list = {
            model: FormForm,
            as : 'form_list',
            attributes:['id'],
            include: [sub_category]
        }

        /////////// Model Form Field
        var form_field = {
            model: FormField,
            as: 'form_field',
            attributes: ['id','form_id','types','configuration','is_required','order'],
            include: [form_list]
        }

        /////////// Model Form Response
        var form_response = {
            model: FormResponse,
            as: 'form_response',
            attributes: ['id','form_id','user_id','createdAt','updatedAt'],
            include: [pegawai, form_list]
        }

        return  FormResponseField
        .findAll({
        attributes : ['id','form_field_id','form_response_id'],
        include: [{
            model: FormResponse,
            as: 'form_response',
            attributes: ['id','form_id','user_id','createdAt','updatedAt'],
            include: [pegawai, {
                model: FormForm,
                as: 'form_list',
                attributes: ['id','name','sub_category_id','types','is_template','createdAt','updatedAt'],
            }]
        },form_field],
        order: [
            ['createdAt', 'Asc']
        ]
        })
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(error));
    },
    //ubah
    create(req,res){
        // console.log(req.body.length)
        let data = req.body.form_field
        let data_response = []
        let data_field_response =[]
        for (let index = 0; index < data.length; index++) {
            data_response.push(FormResponse.create({
                form_id: data[index].form_id,
                user_id: req.body.user_id,
                response: data[index].configuration
            }))
        }
        Promise.all(data_response)
        .then(result => {
            for(let index =0; index < result.length; index++){
                data_field_response.push(FormResponseField.create({
                    form_field_id : data[index].id,
                    form_response_id: result[index].id
                }))
            }
            Promise.all(data_field_response)
            .then(result2 => res.status(200).send({result,result2}))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
    update(req,res){
        return FormField
        .findOne({
            attributes : ['id','form_id','types','configuration','is_required','createdAt','updatedAt'],
            where: {
                id : req.params.id
            },
        })
        .then((FormField)=>{
            return FormField.update({
                form_id: req.body.form_id || FormField.form_id,
                types: req.body.type || FormField.type,
                configuration: req.body.configuration || FormField.configuration,
                is_required: req.body.is_required || FormField.is_required,
                order: req.body.order || FormField.order,
                updatedAt :new Date(),
            })
        })
        .then(updated => res.status(201).send(updated))
        .catch(error => res.status(400).send(error));
    },
    delete(req,res){
        const deleteThis= FormField.destroy({ where: {
            id: req.params.id
        }})
        if (deleteThis) {
            res.json({
                'status': 'OK',
                'messages': 'Delete Success',
                'data': deleteThis,
            })
        }else{
            res.json({
                "status" : "Error",
                'messages': 'Error Delete',
            })
        }
    },

}