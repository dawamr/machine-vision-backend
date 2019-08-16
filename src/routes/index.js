const formCategoryController = require('../controllers').from_category;
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
  // app.patch('/api/category/:id', formCategoryController.restore)
  // app.get('/api/category/:name', formCategoryController.search)


  // (Form Builder) Sub Category
  // app.post('/api/category/sub', formCategoryController.create)
  // app.get('/api/category/sub', formCategoryController.list)
  // app.put('/api/category/sub/:id', formCategoryController.update)
  // app.delete('/api/category/sub/:id', formCategoryController.delete)
  
}
