const teamController = require('../controllers').teams;
const express = require('express')
const team = express.Router();

team.post('/', teamController.create)
team.get('/list', teamController.list);
team.get('/list_all', teamController.listAll);
team.get('/:id', teamController.detail);
team.put('/:id', teamController.update);
team.delete('/:id', teamController.delete);

module.exports = team;
