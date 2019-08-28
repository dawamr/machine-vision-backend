
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
const resp = require('../views/response');
const formCategoryController = require('../controllers').form_category;
const formSubCategoryController = require('../controllers').form_sub_category;
const formFormController = require('../controllers').form_form;
const formAction = require('../controllers').form_action;
// console.log(Object.keys(require('../controllers')));
const express = require('express')

module.exports = (app) => {

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the MV API!',
  }));
  
  // (Form Builder) Category 
  app.post('/api/category', formCategoryController.create)
  app.get('/api/category', formCategoryController.list)
  app.put('/api/category/:id', formCategoryController.update)
  app.delete('/api/category/:id', formCategoryController.delete)
  app.get('/api/category/search', formCategoryController.search)

  // app.patch('/api/category/:id', formCategoryController.restore)


  // (Form Builder) Sub Category
  app.post('/api/category/sub', formSubCategoryController.create)
  app.get('/api/category/sub', formSubCategoryController.list)
  app.put('/api/category/sub/:id', formSubCategoryController.update)
  app.delete('/api/category/sub/:id', formSubCategoryController.delete)
  app.get('/api/category/sub/search', formSubCategoryController.search)

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
  

  app.use(express.static('public'));
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
    switch(err.status) { 
      case 400: { 
        console.log(err); 
        resp.ok(false, "Error 400 : " + err.type, null, res.status(400));
        break; 
      }
      case undefined: { 
        console.log(err);
        resp.ok(false, "Error " + err.status + " : " + err.type, null, res.status(500)); 
        break;              
      } 
      default: { 
        console.log(err);
        resp.ok(false, "Error " + res.status + " : " + err.type, null, res.status(res.status)); 
        break;              
      } 
   } 
  });
}
