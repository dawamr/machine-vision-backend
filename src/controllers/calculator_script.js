const formula = require('../models').calculator_formula;
const formula_parameter = require('../models').calculator_formula_parameter;
const sector = require('../models').sector;
const line = require('../models').line;
const process_machine = require('../models').process_machine;
const process = require('../models').process;
const machine = require('../models').machine;
const parameter = require('../models').parameters;


const resp = require('../views/response');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const model = require('../models');
const db = model.sequelize;

module.exports = {
    ShowScript(req,res){
        let qcaculator;
        if(req.query.calculator != undefined){
            qcaculator =req.query.calculator
        }
        let p = {
            model: parameter,
            as: 'parameter',
            attributes: [['id','id_parameter'],'name','group','level','type','configuration','createdAt','updatedAt'],
        }
        let f = {
            model: formula,
            as: 'formula',
            attributes: [['id','id_formula'],'level','level_reference_id','formula_script','formula_xml','createdAt','updatedAt'],
            where:{
                'level': qcaculator ,
                'level_reference_id' : req.params.id
            }
        }
        formula_parameter.findAll({
            include:[f,p],
            attributes:[],
        })
        .then(result => {
            resp.ok(true, `Get Caculator Script ${qcaculator}`, result, res);
        })
        .catch((error) => {
            resp.ok(false, `Get Caculator Script ${qcaculator}`, null, res.status(400));
            console.log(error);
        });
    },

    Test(req, res){
        let qw = req.query
        let body = req.body

        if(qw.calculator != 'plant' && qw.calculator != 'machine' && qw.calculator != 'line' && qw.calculator != 'sector'){
            return res.json(`calculator ${qw.calculator} not defined`)
        }
        if(qw.calculator == undefined){
            return res.json(`calcuator undefined`)
        }
        
        return db.transaction(t => {
            return formula
            .create({
                level: qw.calculator,
                level_reference_id: req.params.id,
                formula_script: body.formula_script,
                formula_xml: body.formula_xml
            }, {transaction: t})
            .then(result => {
                body.calculator_input.map(data => {
                    formula_parameter.create({
                        formula_id : result.id,
                        parameter_id: data.parameter_id
                    },{transaction: t})

                })
            })
            
        })
        .then(() => {
            res.json('suceess')
        })
        .catch(error =>{
            transaction.rollback()
            res.status(400).send(error);
        })
    }
}