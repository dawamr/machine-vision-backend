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
        if(req.query.type == 'blank'){

            let form_category = FormCategory.findAll({
                attributes: ['id','name'],
                order: [
                    ['name', 'asc']
                ],
            })
            let form_sub_category = FormSubCategory.findAll({
                attributes: ['id','name'],
                order: [
                    ['name', 'asc']
                ], 
            })
    
            let form_data = {
                category : req.body.category,
                sub_category : req.body.sub_category,
                type : req.body.type
            }
    
            return Promise.all([form_category, form_sub_category]).then(function(result) {
                res.json(result)
            });
        }
        
        if(req.query.type =='template'){
            let form_id_new;
            FormForm.findByPk(req.body.form_id,{
                attributes: ['name','sub_category_id','type']
            }).then(result =>
                    res.json(result)
            )
            .catch(error => res.status(400).send(error))
            res.json(form_id_new)
            // FormField.findAll({
            //     attributes: ['form_id','types','configuration','is_required','order'],
            //     where:{ 
            //         form_id : req.body.form_id
            //     }
            // })
            // .then(result => )
            // .catch(error => res.status(400).send(error));
        } 
    },
    store(req,res){
        let data = req.body.form_field
        let data_field = []
        let form = req.body.form_id
        for (let index = 0; index < data.length; index++) {
            data_field.push(FormField.create({
                form_id: form,
                types: data[index].type,    
                configuration: data[index].configuration,
                is_required: data[index].is_required,
                order: data[index].order
            }))
            
        }
        Promise.all(data_field)
        .then(result => res.status(201).send(result))
        .catch(error => res.status(400).send(error));
    },
    
}