const formCategoryController = require('../controllers').from_category;
module.exports = (app) => {
  
  // Setup Router
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the MV API!',
  }));

  // (Form Builder) Category 
  app.get('/api/category', formCategoryController.list)
  app.post('/api/category', formCategoryController.create)
  app.put('/api/category/:id', formCategoryController.update)
  // app.get('/api/category/:name', formCategoryController.search)

}
