const processMachineController = require('../controllers').process_machines;
const express = require('express')
const processMachine = express.Router();

processMachine.post('/', processMachineController.create)
processMachine.get('/list', processMachineController.list);
processMachine.get('/list_all', processMachineController.listAll);
processMachine.get('/:id', processMachineController.detail);
processMachine.put('/:id', processMachineController.update);
processMachine.delete('/:id', processMachineController.delete);

module.exports = processMachine;
