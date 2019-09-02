const productController = require('../controllers').products;
const serviceResponse = require('../../src/helpers/ServiceResponse');
const express = require('express')
const product = express.Router();

product.post('/', productController.create)
product.get('/list', productController.list);
product.get('/list_all', productController.listAll);
product.get('/:id', productController.detail);
product.put('/:id', productController.update);
product.delete('/:id', productController.delete);

module.exports = product;
