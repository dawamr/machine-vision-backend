const calFormulaController = require('../controllers').cal_formula;
const express = require('express')
const calFormula = express.Router();

// calFormula.post('/', calFormulaController.create)
calFormula.get('/list_all', calFormulaController.listCalculator);

// query => ?calculator=machine&where1=sector1&where2=line1&key=hallo
// calFormula.get('/list', calFormulaController.list);
// calFormula.get('/list_all', calFormulaController.listAll);
// calFormula.get('/:id', calFormulaController.detail);
// calFormula.put('/:id', calFormulaController.update);
// calFormula.delete('/:id', calFormulaController.delete);

module.exports = calFormula;