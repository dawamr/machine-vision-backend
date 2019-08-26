const Promise = require('bluebird');
const UserService = require('./UserService');
const JwtService = require('./JWTService');

function TokenService() {
  function decodeToken(token) {
    return new Promise(function (resolve, reject) {
      token = token.replace('Bearer ', '');
      let decoded = JwtService.decode(token);
      if (!decoded.exp) {
        let error = Error('Token telah kadaluarsa, silahkan login kembali.');
        error.code = 401;
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
              error.code = 500;
              error.message = 'Tidak dapat mengambil data user.';
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
