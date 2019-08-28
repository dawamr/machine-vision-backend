const Promise = require('bluebird');
const UserService = require('./UserService');
const JwtService = require('./JWTService');
const RefreshTokenService = require('./RefreshTokenService');

function TokenService() {
  function decodeToken(token) {
    return new Promise(function (resolve, reject) {
      token = token.replace('Bearer ', '');

      RefreshTokenService.getByToken(token)
      .then(function (p) {
        if (!p) {
          let error = new Error();
          error.code = 401;
          error.status = 401;
          error.message = 'Invalid token.';
          reject(error);
        }
      }, function (error) {
        reject(error);
      });

      let decoded = JwtService.decode(token);
      if (!decoded.exp) {
        let error = new Error();
        error.code = 401;
        error.status = 401;
        error.message = 'Token expired, please try login again.';
        reject(error);
      } else {
        // should check if `decoded.sub` is present?
        let userId = decoded.data.id;
        // check if token is expired
        UserService.byId(userId)
          .then(function (p) {
            if (p) {
              let user = p.toJSON();
              resolve({
                user: user,
              });
            } else {
              let error = new Error();
              error.code = 400;
              error.status = 400;
              error.message = 'Failed get data user.';
              reject(error);
            }
          }, function (error) {
            // error.code = 500;
            // error.message = 'Tidak dapat mengambil data user.';
            reject(error);
          });
      }
    });
  }
  return {
    decodeToken
  }
}

module.exports = TokenService();
