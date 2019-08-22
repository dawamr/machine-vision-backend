const parameters_controller = require('../controllers/index').parameters_index;
module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the MV API!',
  }));

  app.get('/api/parameters', parameters_controller.list);
  app.post('/api/parameters', parameters_controller.create);
  app.put('/api/parameters', parameters_controller.update);
  app.delete('/api/parameters', parameters_controller.destroy);

}
