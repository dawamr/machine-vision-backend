const lineController = require('../controllers/lines');
const serviceResponse = require('../../src/helpers/ServiceResponse');
const express = require('express');
const line = express.Router();

line.post('/', lineController.create, serviceResponse);
line.put('/:id', lineController.update, serviceResponse);
line.get('/list_all', lineController.listAll, serviceResponse);
line.get('/list', lineController.list, serviceResponse);
line.get('/:id', lineController.detail, serviceResponse);
line.get('/filter', lineController.filter, serviceResponse);
line.delete('/:id',lineController.delete, serviceResponse);

module.exports = line;
