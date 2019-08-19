const formCategoryController = require('../controllers').form_category;
const formSubCategoryController = require('../controllers').form_sub_category;
const formFormController = require('../controllers').form_form;
const formFieldController = require('../controllers').form_field;
// console.log(Object.keys(require('../controllers')));
module.exports = (app) => {
  
  // Setup Router
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the MV API!',
  }));

  // (Form Builder) Category 
  app.post('/api/rate', formCategoryController.create)
  app.get('/api/rate', formCategoryController.list)
  app.put('/api/rate/:id', formCategoryController.update)
  app.delete('/api/rate/:id', formCategoryController.delete)
  app.get('/api/rate/search', formCategoryController.search)

  // app.patch('/api/rate/:id', formCategoryController.restore)


  // (Form Builder) Sub Category
  app.post('/api/rate/sub', formSubCategoryController.create)
  app.get('/api/rate/sub', formSubCategoryController.list)
  app.put('/api/rate/sub/:id', formSubCategoryController.update)
  app.delete('/api/rate/sub/:id', formSubCategoryController.delete)
  app.get('/api/rate/sub/search', formSubCategoryController.search)

  // (Form Builder) Form list
  app.post('/api/form', formFormController.create)
  app.get('/api/form', formFormController.list)
  app.put('/api/form/:id', formFormController.update)
  app.delete('/api/form/:id', formFormController.delete)
  app.get('/api/form/search', formFormController.search)

  // (Form Builder) Form Field
  app.post('/api/form/field', formFieldController.create)
  app.get('/api/form/field', formFieldController.list)
  app.put('/api/form/field/:id', formFieldController.update)
  app.delete('/api/form/field/:id', formFieldController.delete)
  
}
