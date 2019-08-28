const plantController = require('../controllers').plants;
const express = require('express')
const plant = express.Router();

plant.post('/', plantController.create)
plant.get('/list', plantController.list);
plant.get('/list_all', plantController.listAll);
plant.get('/:id', plantController.detail);
plant.put('/:id', plantController.update);
plant.delete('/:id', plantController.delete);

module.exports = plant;
