const calFormulaController = require('../controllers').cal_formula;
const calScript = require('../controllers').cal_script;
const calEditor = require('../controllers').cal_io;
const calResult = require('../controllers').cal_result;
const express = require('express')
const calculator = express.Router();



//calculator Filter
calculator.get('/machine', calFormulaController.machineList)
calculator.get('/sector',calFormulaController.sectorList)
calculator.get('/line',calFormulaController.lineList)
calculator.get('/plant',calFormulaController.plantList)

//calculator List
calculator.get('/machine/list',calFormulaController.machineList)
calculator.get('/sector/list',calFormulaController.sectorList)
calculator.get('/line/list',calFormulaController.lineList)
calculator.get('/plant/list',calFormulaController.plantList)

//calculator Editor

calculator.get('/:level/:id/formula', calScript.FormulaList)
calculator.get('/:level/:id/formula/:id_formula', calScript.FormulaDetail)
calculator.post('/:level/:id/formula',calScript.NewFormula)
calculator.post('/:level/:id/formula/:id_formula/active',calScript.formulaActive)
calculator.post('/:level/:id/formula/:id_formula/sleep',calScript.formulaSleep)
calculator.put('/:level/:id/formula/:id_formula',calScript.UpdateFormula)
calculator.delete('/:level/:id/formula/:id_formula',calScript.DeleteFormula)

calculator.get('/:level/:id/result',calResult.calculateResult)

calculator.get('/:level/:id/formula/:id_formula/sensor', calEditor.listSensor)
calculator.post('/:level/:id/formula/:id_formula/sensor', calEditor.addSensor)
calculator.put('/:level/:id/formula/:id_formula/sensor/:id_sensor', calEditor.updateSensor)
calculator.delete('/:level/:id/formula/:id_formula/sensor/:id_sensor', calEditor.deleteSensor)
calculator.get('/:level/:id/formula/:id_formula/:type',calEditor.parameter)


module.exports = calculator;