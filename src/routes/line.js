const lineController = require('../controllers/line');
const serviceResponse = require('../../src/helpers/ServiceResponse');
const express = require('express');
const router = express.Router();

router.post('/add', lineController.create, serviceResponse);
router.put('/update/:id', lineController.update, serviceResponse);

router.get('/all', lineController.listAll, serviceResponse);
router.get('/list', lineController.list, serviceResponse);
router.get('/detail/:id', lineController.detail, serviceResponse);
router.get('/filter', lineController.filter, serviceResponse);

router.delete('/delete/:id',lineController.delete, serviceResponse);

module.exports = router;
