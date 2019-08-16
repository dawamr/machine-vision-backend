const formCategoryController = require('../controllers').form_category;
const formSubCategoryController = require('../controllers').form_sub_category;
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
  app.post('/api/rate/search', formCategoryController.search)

  // app.patch('/api/rate/:id', formCategoryController.restore)


  // (Form Builder) Sub Category
  app.post('/api/rate/sub', formSubCategoryController.create)
  app.get('/api/rate/sub', formSubCategoryController.list)
  app.put('/api/rate/sub/:id', formSubCategoryController.update)
  app.delete('/api/rate/sub/:id', formSubCategoryController.delete)
  app.post('/api/rate/sub/search', formSubCategoryController.search)
  
}
