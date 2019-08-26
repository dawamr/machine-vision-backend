const departmentController = require('../controllers').departments;
const express = require('express')
const department = express.Router();

department.post('/', departmentController.create)
department.get('/list', departmentController.list);
department.get('/list_all', departmentController.listAll);
department.get('/:id', departmentController.detail);
department.put('/:id', departmentController.update);
department.delete('/:id', departmentController.delete);

module.exports = department;
