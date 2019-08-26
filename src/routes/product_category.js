const productCategoryController = require('../controllers').product_categories;
const express = require('express')
const productCategory = express.Router();

productCategory.post('/', productCategoryController.create)
productCategory.get('/list', productCategoryController.list);
productCategory.get('/list_all', productCategoryController.listAll);
productCategory.get('/:id', productCategoryController.detail);
productCategory.put('/:id', productCategoryController.update);
productCategory.delete('/:id', productCategoryController.delete);

module.exports = productCategory;
