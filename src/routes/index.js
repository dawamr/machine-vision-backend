const department = require('./department');
const shift = require('./shift');
const plant = require('./plant');
const team = require('./team');
const product = require('./product');
const productCategory = require('./product_category');
const jobDescription = require('./job_description');
const sector = require('./sector');
const processMachine = require('./process_machine');
const machine = require('./machine');;
const uploadFile = require('./upload_file');
const user = require('./user');
const resp = require('../views/response');
const express = require('express');
const app = express.Router();
const accessToken = require('../middleware/AccessTokenMiddleware');

module.exports = (express) => {
  app.use(accessToken
  .unless({
    path: [{
      url: '/api',
      methods: ['GET'],
      message: 'Welcome to the MV API!'
    }, 
    {
      url: '/api/user/login',
      methods: ['POST']
    }]
  }));

  app.use(express.static('public'));
  app.use('/api/user', user);
  app.use('/api/department', department);
  app.use('/api/shift', shift);
  app.use('/api/plant', plant);
  app.use('/api/team', team);
  app.use('/api/product', product);
  app.use('/api/product_category', productCategory);
  app.use('/api/job_description', jobDescription);
  app.use('/api/sector', sector);
  app.use('/api/process_machine', processMachine);
  app.use('/api/machine', machine);
  app.use('/api/upload', uploadFile);

  app.use(function(req, res, next) {
    resp.ok(false, "Error 404 not found.", null, res.status(404));
  });

  app.use(function (err, req, res, next) {
    console.log(err)
    switch(err.status) { 
      case 400: { 
        console.log(err); 
        resp.ok(false, "Error 400 : " + err.type, null, res.status(400));
        break; 
      }
      case 401: { 
        console.log(err); 
        resp.ok(false, err.message, null, res.status(401));
        break; 
      }
      case undefined: { 
        console.log(err);
        resp.ok(false, err, null, res.status(500)); 
        break;              
      } 
   } 
  });

  return app;
};
