const resp = require('../views/response');
module.exports = (express) => {
  let router = express.Router();
  router.use(require('../middleware/AccessTokenMiddleware')
  .unless({
    path: [{
      url: '/api',
      methods: ['GET'],
      message: 'Welcome to the MV API!'
    }, 
    {
      url: '/api/user/login',
      methods: ['POST']
    }]
  }));

  router.use('/api/user', require('./userRoute'));
  router.use('/api/department', require('./department'));
  router.use('/api/shift', require('./shift'));
  router.use('/api/plant',  require('./plant'));
  router.use('/api/team',  require('./team'));
  router.use('/api/product',  require('./product'));
  router.use('/api/product_category',  require('./product_category'));
  router.use('/api/job_description',  require('./job_description'));
  router.use('/api/sector',  require('./sector'));

  router.use(function(req, res, next) {
    resp.ok(false, "Error 404 not found.", null, res.status(404));
  });

  router.use(function (err, req, res, next) {
    switch(err.status) { 
      case 400: { 
        console.log(err); 
        resp.ok(false, "Error 400 : " + err.type, null, res.status(400));
        break; 
      }
      case undefined: { 
        console.log(err);
        resp.ok(false, "Error " + err.status + " : " + err.type, null, res.status(500)); 
        break;              
      } 
      default: { 
        console.log(err);
        resp.ok(false, "Error " + res.status + " : " + err.type, null, res.status(res.status)); 
        break;              
      } 
   } 
  });

  return router;
};
