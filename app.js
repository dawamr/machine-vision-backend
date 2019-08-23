const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const apiEndpoint = require('./src/routes');

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

app.use(apiEndpoint(express));

// handle 404 error
app.use((req, res, next) => {
  let err = new Error('Path Not Found');
  err.status = 404;
  next(err);
});

// handle server error
app.use((err, req, res, next) => {
  let statusCode = err.code;
  if (statusCode >= 100 && statusCode < 600)
    res.status(statusCode);
  else
    res.status(500);
  let message = err.message;
  delete err.message;
  delete err.code;
  res.json({
    status: false,
    message: message,
    data: err
  });
});

module.exports = app;
