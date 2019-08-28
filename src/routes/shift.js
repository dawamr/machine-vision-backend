const shiftController = require('../controllers').shifts;
const express = require('express')
const shift = express.Router();

shift.post('/', shiftController.create)
shift.get('/list', shiftController.list);
shift.get('/list_all', shiftController.listAll);
shift.get('/:id', shiftController.detail);
shift.put('/:id', shiftController.update);
shift.delete('/:id', shiftController.delete);

module.exports = shift;
