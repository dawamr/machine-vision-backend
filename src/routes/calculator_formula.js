const calFormulaController = require('../controllers').cal_formula;
const calScript = require('../controllers').cal_script;
const calEditor = require('../controllers').cal_io;
const express = require('express')
const calculator = express.Router();

// calFormula.post('/', calFormulaController.create)
calculator.get('/list_all', calFormulaController.listCalculator);

calculator.get('/code/:id',calScript.ShowScript)
calculator.post('/code/:id',calScript.Test)

calculator.get('/editor/:id', calEditor.Test)
// query => ?calculator=machine&where1=sector1&where2=line1&key=hallo
// calFormula.get('/list', calFormulaController.list);
// calFormula.get('/list_all', calFormulaController.listAll);
// calFormula.get('/:id', calFormulaController.detail);
// calFormula.put('/:id', calFormulaController.update);
// calFormula.delete('/:id', calFormulaController.delete);

module.exports = calculator;