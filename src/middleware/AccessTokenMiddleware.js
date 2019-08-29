const TokenService = require('../service/TokenService');

function AccessTokenMiddleware(req, res, next) {
  let token = (req.body && req.body['authorization']) || (req.query && req.query['authorization']) || req.headers['authorization'];

  req.user = false;
  req.rawUser = false;
  if (token) {
    try {
      let auth = TokenService.decodeToken(token);
      if (auth) {
        auth.then((p) => {
          if (!p.user) {
            next(err);
          }
          req.user = p.user;
          next();
        }, (err) => {
          next(err);
        })
      }
    } catch (err) {
      next(err);
    }
  } else {
    let error = new Error();
    error.code = 401;
    error.status = 401;
    error.message = 'Access token not found';
    next(error);
  }
}

AccessTokenMiddleware.unless = require('express-unless');

module.exports = AccessTokenMiddleware;
