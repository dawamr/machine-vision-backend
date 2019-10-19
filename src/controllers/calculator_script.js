const formula = require('../models').calculator_formula;
const runner = require('../models').calculator_runner;
const runner_result = require('../models').calculator_runner_result;
const formula_parameter = require('../models').calculator_formula_parameter;
const sector = require('../models').sector;
const line = require('../models').line;
const process_machine = require('../models').process_machine;
const process = require('../models').process;
const machine = require('../models').machine;
const plant = require('../models').plant;
const parameter = require('../models').parameters;


const resp = require('../views/response');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const model = require('../models');
const db = model.sequelize;

module.exports = {

    machineScript(req,res){
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
                'level': 'machine' ,
                'level_reference_id' : req.params.id,
                'is_active' : true
            },
            order: [
            ['createdAt', 'Asc']
            ],
        }
        formula_parameter.findAll({
            include:[f,p],
            attributes:[],
        })
        .then(result => {
            resp.ok(true, `Get Caculator Script Machine`, result, res);
        })
        .catch((error) => {
            resp.ok(false, `Get Caculator Script Machine`, null, res.status(400));
            console.log(error);
        });
    },

    lineScript(req,res){
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
                'level': 'line' ,
                'level_reference_id' : req.params.id,
                'is_active' : true
            },
            order: [
            ['createdAt', 'Asc']
            ],
        }
        formula_parameter.findAll({
            include:[f,p],
            attributes:[],
        })
        .then(result => {
            resp.ok(true, `Get Caculator Script Line`, result, res);
        })
        .catch((error) => {
            resp.ok(false, `Get Caculator Script Line`, null, res.status(400));
            console.log(error);
        });
    },
    
    sectorScript(req,res){
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
                'level': 'sector' ,
                'level_reference_id' : req.params.id,
                'is_active' : true
            },
            order: [
            ['createdAt', 'Asc']
            ],
        }
        formula_parameter.findAll({
            include:[f,p],
            attributes:[],
        })
        .then(result => {
            resp.ok(true, `Get Caculator Script Sector`, result, res);
        })
        .catch((error) => {
            resp.ok(false, `Get Caculator Script Sector`, null, res.status(400));
            console.log(error);
        });
    },

    plantScript(req,res){
        let page = 1;
        let perPage = 100;
        if(req.query.version != undefined && (req.query.version.length > 0)){
            perPage = req.query.version
        }
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
                'level': 'plant' ,
                'is_active' : true
            },
            
        }
        let skip = (page - 1) * perPage
        
        formula_parameter.findAll({
            include:[f,p],
            attributes:[],
            order: [
                ['createdAt', 'Asc']
            ],
            limit: perPage,
            offset :skip,
        })
        .then(result => {
            resp.ok(true, `Get Caculator Script Plant`, result, res);
        })
        .catch((error) => {
            resp.ok(false, `Get Caculator Script Plant`, null, res.status(400));
            console.log(error);
        });
    },

    machineRunner(req,res){
        console.log('')
    },

    sectorRunner(req,res){
        console.log('')
    },

    lineRunner(req,res){
        console.log('')
    },

    async plantRunner(req,res){
        const before = Date.now();
        let qw = req.query
        let body = req.body
        let formulaID
        let plantID = 1
        let _formula_parameter = []
        let _runner_result = []
        let version
        if(qw.type == 'save'){
            version = true;
        }
        try {
            await plant.findOne({}).then(result=> plantID = result.id)
            // let _formula = await 
            await formula.create({
                level: 'plant',
                level_reference_id: plantID,
                formula_script: body.formula_script,
                formula_xml: body.formula_xml,
                is_active: version
            })
            .then(result =>{
                 formulaID = result.id
            })
                
            await body.calculator_input.map(data => {
                console.log(formulaID)
                _formula_parameter.push(formula_parameter.create({
                    formula_id: formulaID,
                    parameter_id: data.parameter_id
                }))
                _runner_result.push(runner_result.create({
                    parameter_name: data.parameter_name,
                    parameter_id: data.parameter_id,
                    value: data.value
                }))
            })
            let end = Date.now()
            let execute =(end - before)
            let _runner = await runner.create({
                formula_id: formulaID,
                start: before,
                end: end,
                execute_time: execute,
                formula_script: body.formula_script,
                formula_xml: body.formula_xml,
            })
            await Promise.all([..._formula_parameter,..._runner_result,_runner])
            .then(result => res.status(201).send(result))
            .catch(error => res.status(400).send(error));
        } catch (error) {
            res.status(400).send(error);
        }
    },

    async Test(req, res){
        const before = Date.now();
        let qw = req.query
        let body = req.body
        let formulaID
        let _formula_parameter = []
        let _runner_result = []


        try {
            if(qw.calculator != 'plant' && qw.calculator != 'machine' && qw.calculator != 'line' && qw.calculator != 'sector'){
                return res.json(`calculator ${qw.calculator} not defined`)
            }
            if(qw.calculator == undefined){
                return res.json(`calcuator undefined`)
            }
            
            // let _formula = await 
            await formula.creversionate({
                level: qw.calculator,
                level_reference_id: req.params.id,
                formula_script: body.formula_script,
                formula_xml: body.formula_xml,
                is_active: version
            })
            .then(result =>formulaID = result.id)
                
            await body.calculator_input.map(data => {
                _formula_parameter.push(formula_parameter.create({
                    formula_id: formulaID,
                    parameter_id: data.parameter_id
                }))
                _runner_result.push(runner_result.create({
                    parameter_name: data.parameter_name,
                    parameter_id: data.parameter_id,
                    value: data.value
                }))
            })
            let end = Date.now()
            let execute =(end - before)
            let _runner = await runner.create({
                start: before,
                end: end,
                execute_time: execute,
                formula_script: body.formula_script,
                formula_xml: body.formula_xml,
            })
            await Promise.all([..._formula_parameter,..._runner_result,_runner])
            .then(result => res.status(201).send(result))
            .catch(error => res.status(400).send(error));
        } catch (error) {
            res.status(400).send(error);
        }

        

    }
}