const express = require('express');
const router = express.Router();
const config = require('../config/setting');
const userValidator = require('../helpers/validator');
const userController = require('../controllers/UserController');
const serviceResponse = require('../formatter/ServiceResponse');


router.post('/', userValidator, userController.create, serviceResponse);
