const processMachineController = require('../controllers').process_machines;
const express = require('express')
const processMachine = express.Router();

processMachine.post('/add_process', processMachineController.createProcess);
processMachine.post('/add_machine', processMachineController.createMachine);
processMachine.get('/list_machine', processMachineController.listMachine);
processMachine.get('/list', processMachineController.list);
processMachine.get('/list_all', processMachineController.listAll);
processMachine.get('/:id', processMachineController.detail);
processMachine.put('/update_process/:process_id', processMachineController.updateProcess);
processMachine.put('/update_machine/:process_machine_id', processMachineController.updateMachine);
processMachine.delete('/delete_process/:process_id', processMachineController.deleteProcess);

module.exports = processMachine;
