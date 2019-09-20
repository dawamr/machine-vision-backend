const processMachineController = require('../controllers').process_machines;
const express = require('express')
const processMachine = express.Router();

processMachine.post('/add_process', processMachineController.createProcess);
processMachine.post('/add_machine', processMachineController.createMachine);
processMachine.get('/list_machine', processMachineController.listMachine);
processMachine.get('/list', processMachineController.list);
processMachine.get('/list_all', processMachineController.listAll);
processMachine.get('/:id', processMachineController.detail);
processMachine.put('/:id', processMachineController.update);
processMachine.delete('/:id', processMachineController.delete);

module.exports = processMachine;
