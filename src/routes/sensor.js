const sensorController = require('../controllers').sensors;
const express = require('express')
const sensor = express.Router();

sensor.post('/', sensorController.create)
sensor.get('/list', sensorController.list);
sensor.get('/list_all', sensorController.listAll);
sensor.get('/:id', sensorController.detail);
sensor.put('/:id', sensorController.update);
sensor.delete('/:id', sensorController.delete);

module.exports = sensor;
