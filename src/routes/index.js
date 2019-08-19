const teamsController = require('../controllers').teams;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the MV API!',
  }));

  app.post('/api/team', teamsController.create)
  app.get('/api/team/list', teamsController.list);
  app.get('/api/team/list_all', teamsController.listAll);
  app.get('/api/team/:id', teamsController.detail);
  app.put('/api/team/:id', teamsController.update);
  app.delete('/api/team/:id', teamsController.delete);
}