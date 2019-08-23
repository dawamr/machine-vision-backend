module.exports = (express) => {
  let router = express.Router();
  router.use(require('../middleware/AccessTokenMiddleware')
  .unless({
    path: [{
      url: '/api',
      methods: ['GET', 'POST'],
      message: 'Welcome to the MV API!'
    }, {
      url: '/users/login',
      methods: ['POST']
    }]
  }));

  router.use('/users', require('./userRoute'));

  return router;
};
