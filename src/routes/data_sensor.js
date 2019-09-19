const dataSensorController = require('../controllers').data_sensors;
const express = require('express')
const dataSensor = express.Router();

dataSensor.post('/', dataSensorController.create)
dataSensor.get('/list', dataSensorController.list);
dataSensor.get('/list_all', dataSensorController.listAll);
dataSensor.get('/:id', dataSensorController.detail);
dataSensor.put('/:id', dataSensorController.update);
dataSensor.delete('/:id', dataSensorController.delete);

module.exports = dataSensor;
