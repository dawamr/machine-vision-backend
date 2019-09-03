const downtimeReasonController = require('../controllers/downtime_reasons');
const serviceResponse = require('../helpers/ServiceResponse');
const express = require('express');
const downtimeReason = express.Router();

downtimeReason.post('/create', downtimeReasonController.create, serviceResponse);
downtimeReason.get('/all', downtimeReasonController.listAll, serviceResponse);
downtimeReason.put('/update/:id', downtimeReasonController.update, serviceResponse);
downtimeReason.get('/list', downtimeReasonController.list, serviceResponse);
downtimeReason.get('/detail/:id', downtimeReasonController.detail, serviceResponse);
downtimeReason.delete('/delete/:id', downtimeReasonController.delete, serviceResponse);

module.exports = downtimeReason;
