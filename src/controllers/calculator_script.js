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

    FormulaList(req, res){
        formula.findAll({
            attributes: ['id','level','name','is_active','level_reference_id','createdAt','updatedAt'],      
            where:{
                'level':  req.params.level,
                'level_reference_id': req.params.id
            },
        })
        .then(result => {
            resp.ok(true, `Get Caculator Script ${req.params.level}`, result, res);
        })
        .catch((error) => {
            resp.ok(false, `Get Caculator Script ${req.params.level}`, null, res.status(400));
            console.log(error);
        });
    },

    FormulaDetail(req, res){
        
        formula.findAll({
            // attributes: ['id','level','is_active','level_reference_id','formula_script','formula_xml','createdAt','updatedAt'],      
            where:{
                'level': req.params.level,
                'id': req.params.id_formula
            },
        })
        .then(result => {
            resp.ok(true, `Get Detail Caculator Script ${req.params.level}`, result[0], res);
        })
        .catch((error) => {
            resp.ok(false, `Cannot Caculator Script ${req.params.level}`, null, res.status(400));
            console.log(error);
        });
    },

    async NewFormula(req,res){
        const before = Date.now();
        // var formulaID
        // var runnerID
        var runnerData
        let _formula_parameter = []
        let _runner_result = []

        try {
            formula.create({
                name: req.body.name,
                level: req.params.level,
                level_reference_id: req.params.id,
                formula_script: req.body.formula_script,
                formula_xml: req.body.formula_xml,
                is_active: false
            })
            .then(result => res.status(201).send(result))
            .catch(error => res.status(400).send(error));
            // let end = Date.now()
            // let execute =(end - before)
            // let _runner = await runner.create({
            //     formula_id: formulaID,
            //     start: before,
            //     end: end,
            //     execute_time: execute,
            //     formula_script: req.body.formula_script,
            //     formula_xml: req.body.formula_xml,
            // })
            //     .then(result =>{
            //         runnerData = result
            //         runnerID = result.id
            //    })
            //     await req.body.calculator_input.map(data => {
            //         _formula_parameter.push(formula_parameter.create({
            //             formula_id: formulaID,
            //             parameter_id: data.parameter_id
            //         }))
            //         _runner_result.push(runner_result.create({
            //             parameter_name: data.parameter_name,
            //             parameter_id: data.parameter_id,
            //             value: data.value,
            //             runner_id:runnerID
            //         }))
            //     })
           
            // await Promise.all([..._formula_parameter,runnerData,..._runner_result])
            // .then(result => res.status(201).send(result))
            // .catch(error => res.status(400).send(error));
        } catch (error) {
            res.status(400).send(error);
        }
    },

    async UpdateFormula(req,res){
        const before = Date.now();
        let formulaID
        var runnerID
        var runnerData
        let _formula_parameter = []
        let _runner_result = []

        try {
            // await formula.update({
            //     name: req.body.name,
            //     updatedAt :new Date(),
            // }, {
            //     where: {
            //     id: req.params.id
            //     }
            // })
            await formula.update({
                name: req.body.name,
                level: req.params.level,
                level_reference_id: req.params.id,
                formula_script: req.body.formula_script,
                formula_xml: req.body.formula_xml,
                is_active: false
            },{
                where: {
                    id: req.params.id_formula
                }
            })
            .then(result => res.status(201).send(req.body))
            .catch(error => res.status(400).send(error));

            //     let end = Date.now()
            //     let execute =(end - before)
            //     let _runner = await runner.create({
            //         formula_id: req.params.id_formula,
            //         start: before,
            //         end: end,
            //         execute_time: execute,
            //         formula_script: req.body.formula_script,
            //         formula_xml: req.body.formula_xml,
            //     })
            //     .then(result =>{
            //         runnerData = result
            //         runnerID = result.id
            //    })  
            //     await req.body.calculator_input.map(data => {
            //         _formula_parameter.push(formula_parameter.create({
            //             formula_id: req.params.id_formula,
            //             parameter_id: data.parameter_id
            //         }))
            //         _runner_result.push(runner_result.create({
            //             parameter_name: data.parameter_name,
            //             parameter_id: data.parameter_id,
            //             value: data.value,
            //             runner_id: runnerID
            //         }))
            //     })
                
            //     await Promise.all([..._formula_parameter,runnerData,..._runner_result])
            //     .then(result => res.status(201).send(result))
            //     .catch(error => res.status(400).send(error));
        } catch (error) {
            res.status(400).send(error);
        }
    },

    DeleteFormula(req, res){
        try {
            let f = formula.destroy({
                where :{
                    id: req.params.id_formula
                }
            })
            let fp = formula_parameter.destroy({
                where :{
                    formula_id: req.params.id_formula
                }
            })
            Promise.all([f,fp])
            .then(result => {
                resp.ok(true, `Success Delete Calculator Formula  ${req.params.level}`, result, res);
            })
            .catch((error) => {
                resp.ok(false, `Cannot Delete Calculator Formula  ${req.params.level}`, null, res.status(400));
                console.log(error);
            });
        } catch (error) {
            resp.ok(false, `Cannot Delete Calculator Formula  ${req.params.level}`, null, res.status(400));
            console.log(error);
        }
    },

    async formulaActive(req, res){
        try {
            await formula.update({
                is_active: false
            },{
                where:{
                    level: req.params.level,
                    level_reference_id: req.params.id,
                    is_active: [true,null]
                }
            })
            await formula.update({
                is_active: true
            },{
                where: {
                    id: req.params.id_formula
                }
            })

            resp.ok(true, `Success Actived Calculator Formula  ${req.params.level}`, null, res);
            
        } catch (error) {
            resp.ok(true, `Failed Active Calculator Formula  ${req.params.level}`, null, res);
        }
    },

    async formulaSleep(req, res){
        try {
            await formula.update({
                is_active: false
            },{
                where: {
                    id: req.params.id_formula
                }
            })

            resp.ok(true, `Success Non Actived Calculator Formula  ${req.params.level}`, null, res);
            
        } catch (error) {
            resp.ok(true, `Failed Non Active Calculator Formula  ${req.params.level}`, null, res);
        }
    },
    
}