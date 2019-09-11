const downtimeCategoryController = require('../controllers/downtime_categories');
const serviceResponse = require('../helpers/ServiceResponse');
const express = require('express');
const downtimeCategory = express.Router();

downtimeCategory.post('/create', downtimeCategoryController.create, serviceResponse);
downtimeCategory.put('/update/:id', downtimeCategoryController.update, serviceResponse);
downtimeCategory.get('/all', downtimeCategoryController.listAll, serviceResponse);
downtimeCategory.get('/list', downtimeCategoryController.list, serviceResponse);
downtimeCategory.get('/detail/:id', downtimeCategoryController.detail, serviceResponse);
downtimeCategory.delete('/delete/:id',downtimeCategoryController.delete, serviceResponse);

module.exports = downtimeCategory;
