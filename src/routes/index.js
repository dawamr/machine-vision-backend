const department = require('./department');
const shift = require('./shift');
const plant = require('./plant');
const team = require('./team');
const product = require('./product');
const productCategory = require('./product_category');
const jobDescription = require('./job_description');
const resp = require('../views/response');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the MV API!',
  }));

  app.use('/api/department', department);
  app.use('/api/shift', shift);
  app.use('/api/plant', plant);
  app.use('/api/team', team);
  app.use('/api/product', product);
  app.use('/api/product_category', productCategory);
  app.use('/api/job_description', jobDescription);

  app.use(function(req, res, next) {
    resp.ok(false, "Error 404 not found.", null, res.status(404));
  });

  app.use(function (err, req, res, next) {
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
}
