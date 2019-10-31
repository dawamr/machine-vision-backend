
  // Setup Router
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
const formCategoryController = require('../controllers').form_category;
const formSubCategoryController = require('../controllers').form_sub_category;
const formFormController = require('../controllers').form_form;
const formAction = require('../controllers').form_action;
const line = require('./line');
const downtimeCategory = require('./downtime_category');
const downtimeReason = require('./downtime_reason');
const sensor = require('./sensor');
const sensorCategory = require('./sensor_category');
const dataSensor = require('./data_sensor');
const express = require('express');
const app = express.Router();
const accessToken = require('../middleware/AccessTokenMiddleware');
const parameters_controller = require('../controllers/index').parameters_index;
const parameter_category_controller = require('../controllers').parameter_category;
const formCreateController = require('../controllers').form_create;
const calFormula= require('./calculator_formula');

module.exports = (express) => {
  app.use(express.static('public'));
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
  
  // Parameter
  app.get('/api/parameters', parameters_controller.list)
  app.post('/api/parameters', parameters_controller.create)
  app.put('/api/parameters/:id', parameters_controller.update)
  app.delete('/api/parameters/:id', parameters_controller.destroy)

  // Parameter Category
  app.post('/api/parameter_category', parameter_category_controller.create)
  app.get('/api/parameter_category', parameter_category_controller.list)
  app.get('/api/parameter_category/:id', parameter_category_controller.retrieve)
  app.put('/api/parameter_category/:id', parameter_category_controller.update)
  app.delete('/api/parameter_category/:id', parameter_category_controller.destroy)

  // (Form Builder) Sub Category
  app.post('/api/category/sub', formSubCategoryController.create)
  app.get('/api/category/sub', formSubCategoryController.list)
  app.put('/api/category/sub/:id', formSubCategoryController.update)
  app.delete('/api/category/sub/:id', formSubCategoryController.delete)
  // app.get('/api/category/sub/search', formSubCategoryController.search)

  // (Form Builder) Category 
  app.post('/api/category', formCategoryController.create)
  app.get('/api/category', formCategoryController.listAll)
  app.get('/api/category/:id', formCategoryController.list)
  app.put('/api/category/:id', formCategoryController.update)
  app.delete('/api/category/:id', formCategoryController.delete)
  // app.get('/api/category/search', formCategoryController.search)

  // app.patch('/api/category/:id', formCategoryController.restore)


  app.get('/api/form/create',formCreateController.list)
  app.post('/api/form/create',formCreateController.store)

  app.get('/api/form/template', formFormController.listTemplate)

  // (Form Builder) Form list
  app.post('/api/form', formFormController.create)
  app.get('/api/form', formFormController.list)
  app.get('/api/search/form', formFormController.search) // not working
  app.get('/api/form/:id', formFormController.show)
  app.put('/api/form/:id', formFormController.update)
  app.delete('/api/form/:id', formFormController.delete)


  // (Form Builder) Form Action
  app.post('/api/form/action', formAction.create)
  app.get('/api/action/form/', formAction.list)
  app.put('/api/form/action/:id', formAction.update)
  app.delete('/api/form/action/:id', formAction.delete)

  // form response 
  app.get('/api/form/:id/response', formAction.showResponse)
  
  app.use('/api/calculator', calFormula);
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
  app.use('/api/line', line);
  app.use('/api/downtime_category', downtimeCategory);
  app.use('/api/downtime_reason', downtimeReason);
  app.use('/api/sensor', sensor);
  app.use('/api/sensor_category', sensorCategory);
  app.use('/api/data_sensor', dataSensor);

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
