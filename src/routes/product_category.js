const productCategoryController = require('../controllers').product_categories;
const express = require('express')
const product_category = express.Router();

product_category.post('/', productCategoryController.create)
product_category.get('/list', productCategoryController.list);
product_category.get('/list_all', productCategoryController.listAll);
product_category.get('/:id', productCategoryController.detail);
product_category.put('/:id', productCategoryController.update);
product_category.delete('/:id', productCategoryController.delete);

module.exports = product_category;
