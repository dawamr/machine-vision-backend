const parameter_category_controller = require('../controllers').parameter_category;
module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the MV API!',
  }));
  app.post('/api/parameter_category', parameter_category_controller.create);
  app.get('/api/parameter_category', parameter_category_controller.list);
  app.get('/api/parameter_category/:id', parameter_category_controller.retrieve);
  app.put('/api/parameter_category/:id', parameter_category_controller.update);
  app.delete('/api/parameter_category/:id', parameter_category_controller.destroy);
}
