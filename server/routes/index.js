const teamsController = require('../server/controllers').teams;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the MV API!',
  }));

  app.post('/api/teams', teamsController.create);

}