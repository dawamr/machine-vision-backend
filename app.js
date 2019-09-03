const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const apiEndpoint = require('./src/routes');
const cors = require('cors');
// Set up the express app
const app = express();

// Log requests to the console.3
app.use(logger('dev'));

app.use(bodyParser.json({
  limit: '5mb'
}));

app.use(bodyParser.urlencoded({
  extended: false,
  limit: '5mb'
}));

app.use(cors());

app.use(apiEndpoint(express));

module.exports = app;
