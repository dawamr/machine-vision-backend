const calRunner = require('../controllers').cal_runner

const express = require('express')
const runner = express.Router();


runner.get('/runner/result/list',calRunner.resultAll)
runner.get('/runner/result/:id',calRunner.resultDetail)
runner.get('/runner/:id/list', calRunner.resultList)
runner.get('/runner/list', calRunner.runnerList);
runner.get('/runner/:id', calRunner.runnerDetail);
runner.post('/runner', calRunner.runnerRun);


runner.post('/runner/:id/result', calRunner.storeResult)

module.exports = runner;