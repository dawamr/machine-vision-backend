const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const serviceResponse = require('../helpers/ServiceResponse');


router.post('/create', userController.create, serviceResponse);
router.post('/login', userController.login, serviceResponse);

module.exports = router;
