const reasonController = require('../controllers/reason');
const serviceResponse = require('../../src/helpers/ServiceResponse');
const express = require('express');
const router = express.Router();

router.post('/create', reasonController.create, serviceResponse);
router.get('/all', reasonController.listAll, serviceResponse);
router.put('/update/:id', reasonController.update, serviceResponse);

router.get('/list', reasonController.list, serviceResponse);
router.get('/detail/:id', reasonController.detail, serviceResponse);

// router.delete('/delete/:id',reasonController.delete, serviceResponse);

module.exports = router;
