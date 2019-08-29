const machineController = require('../controllers').machines;
const express = require('express')
const machine = express.Router();

machine.post('/', machineController.create)
machine.get('/list', machineController.list);
machine.get('/list_all', machineController.listAll);
machine.get('/:id', machineController.detail);
machine.put('/:id', machineController.update);
machine.delete('/:id', machineController.delete);

module.exports = machine;