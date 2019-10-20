const calFormulaController = require('../controllers').cal_formula;
const calScript = require('../controllers').cal_script;
const calEditor = require('../controllers').cal_io;
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
// calculator.get('/plant/script', calScript.plantScript)
// calculator.get('/machine/:id/script', calScript.machineScript)
// calculator.get('/sector/:id/script', calScript.sectorScript)
calculator.get('/:level/:id/formula', calScript.FormulaList)
calculator.get('/:level/:id/formula/:id_formula', calScript.FormulaDetail)
calculator.post('/:level/:id/formula',calScript.NewFormula)
calculator.put('/:level/:id/formula/:id_formula',calScript.UpdateFormula)
calculator.delete('/:level/:id/formula/:id_formula',calScript.DeleteFormula)

// calculator.post('/plant/script',calScript.plantRunner)
// calculator.post('/machine/:id/script',calScript.machineRunner)
// calculator.post('/sector/:id/script',calScript.sectorRunner)

calculator.get('/:level/editor', calEditor.Test)
calculator.get('/:level/:id/editor', calEditor.Test)


// calFormula.post('/', calFormulaController.create)
// calculator.get('/list_all', calFormulaController.listCalculator);

// calculator.get('/code/:id',calScript.ShowScript)
// calculator.post('/code/:id',calScript.Test)

// query => ?calculator=machine&where1=sector1&where2=line1&key=hallo
// calFormula.get('/list', calFormulaController.list);
// calFormula.get('/list_all', calFormulaController.listAll);
// calFormula.get('/:id', calFormulaController.detail);
// calFormula.put('/:id', calFormulaController.update);
// calFormula.delete('/:id', calFormulaController.delete);

module.exports = calculator;