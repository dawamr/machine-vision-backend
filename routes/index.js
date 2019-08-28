const parameters_controller = require('../controllers/index').parameters_index;
const parameter_category_controller = require('../controllers').parameter_category;
// console.log(Object.keys(require('../controllers')))
module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the MV API!',
  }));

  app.get('/api/parameters', parameters_controller.list);
  app.get('/api/parameters/:id', parameters_controller.search);
  app.post('/api/parameters', parameters_controller.create);
  app.put('/api/parameters/:id', parameters_controller.update);
  app.delete('/api/parameters/:id', parameters_controller.destroy);

  app.post('/api/parameter_category', parameter_category_controller.create);
  app.get('/api/parameter_category', parameter_category_controller.list);
  app.get('/api/parameter_category/:id', parameter_category_controller.retrieve);
  app.put('/api/parameter_category/:id', parameter_category_controller.update);
  app.delete('/api/parameter_category/:id', parameter_category_controller.destroy);
}
