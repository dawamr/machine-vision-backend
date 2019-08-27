const express = require('express');
const router = express.Router();
const userController = require('../../src/controllers/UserController');
const serviceResponse = require('../../src/helpers/ServiceResponse');


router.post('/create', userController.create, serviceResponse);
router.post('/login', userController.login, serviceResponse);
router.put('/update/:user_id', userController.update, serviceResponse);
router.delete('/:id', userController.remove, serviceResponse);
router.delete('/logout/:refresh_token', userController.revokeRefreshToken, serviceResponse);

router.get('/all', userController.all, serviceResponse);
router.get('/list', userController.list, serviceResponse);
router.get('/detail/:user_id', userController.detail, serviceResponse);

module.exports = router;
