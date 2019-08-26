const sectorController = require('../controllers').sectors;
const express = require('express')
const sector = express.Router();

sector.post('/', sectorController.create)
sector.get('/list', sectorController.list);
sector.get('/list_all', sectorController.listAll);
sector.get('/:id', sectorController.detail);
sector.put('/:id', sectorController.update);
sector.delete('/:id', sectorController.delete);

module.exports = sector;