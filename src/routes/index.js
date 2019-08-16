const formCategoryController = require('../controllers').from_category;
module.exports = (app) => {
  
  // Setup Router
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the MV API!',
  }));

  // (Form Builder) Category 
  app.post('/api/rate', formCategoryController.create)
  app.get('/api/rate', formCategoryController.listAll)
  app.get('/api/rate/:limit', formCategoryController.listLimit)
  app.put('/api/rate/:id', formCategoryController.update)
  app.delete('/api/rate/:id', formCategoryController.delete)
  app.post('/api/rate/search', formCategoryController.search)
  // app.patch('/api/rate/:id', formCategoryController.restore)


  // (Form Builder) Sub Category
  // app.post('/api/category/sub', formCategoryController.create)
  // app.get('/api/category/sub', formCategoryController.list)
  // app.put('/api/category/sub/:id', formCategoryController.update)
  // app.delete('/api/category/sub/:id', formCategoryController.delete)
  
}
