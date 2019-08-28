const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const serviceResponse = require('../../src/helpers/ServiceResponse');

router.post('/login', userController.login, serviceResponse);
router.delete('/logout/:refresh_token', userController.revokeRefreshToken, serviceResponse);

router.post('/create', userController.create, serviceResponse);
router.put('/update/:user_id', userController.update, serviceResponse);
router.delete('/:id', userController.remove, serviceResponse);
router.get('/all', userController.all, serviceResponse);
router.get('/list', userController.list, serviceResponse);
router.get('/detail/:user_id', userController.detail, serviceResponse);

module.exports = router;
