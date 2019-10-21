const FormUser = require('../models').user;
const FormForm = require('../models').form_form;
const FormSubCategory = require('../models').form_sub_category;
const FormCategory = require('../models').form_category;
const FormField = require('../models').form_field;
const FormResponse = require('../models').form_response;
const FormResponseField = require('../models').form_response_field;
const resp = require('../views/response');
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
        var data_field = []
        let data_response = []
        let formFieldCreate = []
        try {
            FormForm.findByPk(req.body.form_id,{
                attributes:['name']
            })
            .then(result=> {
                if(!result){
                    resp.ok(false, `unknown form`, null, res.status(400));
                }
                FormField.findAll({
                    where: {
                        form_id: req.body.form_id
                    },
                    attributes: ['id','form_id','types','configuration','is_required','order'],
                }).then(result2=>{
                    // return console.log(result.dataValues.name)
                    // return res.json(result2)
                    if(result2.length == 0){
                        FormForm.update(
                            {
                                is_template: req.body.is_template,
                                updatedAt :new Date(),
                            },
                            {where:{
                                id: req.body.form_id
                            }}
                        )
                        data.map(field =>{
                            formFieldCreate.push(FormField.create({
                                form_id: req.body.form_id,
                                types: field.type,    
                                configuration: field.configuration,
                                is_required: field.is_required,
                                order: field.order
                            }))
                        })
                        try {
                            Promise.all(...formFieldCreate)
                            var data3 = {
                                "form":{
                                    "name": result.name,
                                    data
                                }
                            }
                            console.log(data3)
                            resp.ok(true, "Success create form field.", data3, res.status(200));
                        } catch (error) {
                            resp.ok(false, "Failed create form field.", error, res.status(400));
                            console.log(error)
                        }

                    }else{
                        data_response.push({
                            "form" : result,
                            "field" : result2
                        })
                        resp.ok(false, "In this form the fields are found !.", data_response   , res.status(400));
                    }

                }).catch(err=>res.json(err))
            })
        } catch (error) {
            resp.ok(false, "Failed create form field.", error, res.status(400));
        }
        

        // Promise.all(...data_field)
        // .then(result => res.status(201).send(result))
        // .catch(error => res.status(400).send(error));
    },
    
}