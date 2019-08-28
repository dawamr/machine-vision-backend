const express = require('express');
const user = express.Router();
const userController = require('../controllers/users');
const serviceResponse = require('../../src/helpers/ServiceResponse');

user.post('/login', userController.login, serviceResponse);
user.delete('/logout/:refresh_token', userController.revokeRefreshToken, serviceResponse);

user.post('/', userController.create, serviceResponse);
user.get('/list', userController.list, serviceResponse);
user.get('/list_all', userController.all, serviceResponse);
user.get('/:id', userController.detail, serviceResponse);
user.put('/:id', userController.update, serviceResponse);
user.delete('/:id', userController.remove, serviceResponse);

module.exports = user;
