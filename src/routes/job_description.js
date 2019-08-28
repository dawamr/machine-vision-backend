const jobDescriptionController = require('../controllers').job_descriptions;
const express = require('express')
const jobDescription = express.Router();

jobDescription.post('/', jobDescriptionController.create)
jobDescription.get('/list', jobDescriptionController.list);
jobDescription.get('/list_all', jobDescriptionController.listAll);
jobDescription.get('/:id', jobDescriptionController.detail);
jobDescription.put('/:id', jobDescriptionController.update);
jobDescription.delete('/:id', jobDescriptionController.delete);

module.exports = jobDescription;
