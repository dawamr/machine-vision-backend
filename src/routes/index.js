const formCategoryController = require('../controllers').form_category;
const formSubCategoryController = require('../controllers').form_sub_category;
const formFormController = require('../controllers').form_form;
const formAction = require('../controllers').form_action;
// console.log(Object.keys(require('../controllers')));
module.exports = (app) => {
  
  // Setup Router
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
  app.get('/api/form/:id', formFormController.show)
  app.put('/api/form/:id', formFormController.update)
  app.delete('/api/form/:id', formFormController.delete)
  app.get('/api/form/search', formFormController.search)

  // (Form Builder) Form Action
  app.post('/api/form/action', formAction.create)
  app.get('/api/form/action', formAction.list)
  app.put('/api/form/action/:id', formAction.update)
  app.delete('/api/form/action/:id', formAction.delete)
  
  // (Form Builder) Form 
  
}
