const FormForm = require('../models').form_form;
// const FormSubCategory = require('../models').form_sub_category;
// const FormCategory = require('../models').form_category;
const FormField = require('../models').form_field

// console.log(Object.keys(require('../models')));
const Sequelize = require('sequelize');
const Op = Sequelize.Op
module.exports = {
    list(req, res){ 
        // var form = {
        //     model: FormForm,
        //     as: 'form',
        //     attributes: ['name']
        // }    
        return  FormField
        .findAll({
        attributes : ['id','form_id','types','configuration','is_required','order','createdAt','updatedAt'],
        order: [
            ['types', 'Asc']
        ]
        })
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(error));

    },
    create(req,res){
        // console.log('ok')
        return FormField
        .create({
            form_id: req.body.form_id,
            types: req.body.type,
            configuration: req.body.configuration,
            is_required: req.body.is_required,
            order: req.body.order
        })
        .then(created => res.status(201).send(created))
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
                'messages': 'User berhasil dihapus',
                'data': deleteThis,
            })
        }
    },

}