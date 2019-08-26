const productController = require('../controllers').products;
const express = require('express')
const product = express.Router();

product.post('/', productController.create)
product.get('/list', productController.list);
product.get('/list_all', productController.listAll);
product.get('/:id', productController.detail);
product.put('/:id', productController.update);
product.delete('/:id', productController.delete);

module.exports = product;
