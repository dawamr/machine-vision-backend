const categoryController = require('../controllers/category');
const serviceResponse = require('../../src/helpers/ServiceResponse');
const express = require('express');
const router = express.Router();

router.post('/create', categoryController.create, serviceResponse);
router.put('/update/:id', categoryController.update, serviceResponse);

router.get('/all', categoryController.listAll, serviceResponse);
router.get('/list', categoryController.list, serviceResponse);
router.get('/detail/:id', categoryController.detail, serviceResponse);
router.delete('/delete/:id',categoryController.delete, serviceResponse);

module.exports = router;
