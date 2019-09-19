const sensorCategoryController = require('../controllers').sensor_categories;
const express = require('express')
const sensorCategory = express.Router();

sensorCategory.post('/', sensorCategoryController.create)
sensorCategory.get('/list', sensorCategoryController.list);
sensorCategory.get('/list_all', sensorCategoryController.listAll);
sensorCategory.get('/:id', sensorCategoryController.detail);
sensorCategory.put('/:id', sensorCategoryController.update);
sensorCategory.delete('/:id', sensorCategoryController.delete);

module.exports = sensorCategory;
