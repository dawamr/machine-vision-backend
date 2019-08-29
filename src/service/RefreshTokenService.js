const RefreshTokenModel = require('../models').refresh_token;
const _ = require('lodash')
function RefreshTokenService() {

  const insert = (obj) => {
    let token = _.clone(_.omitBy(obj, _.isNil));
    return new Promise((resolve, reject) => {
      RefreshTokenModel.create(token)
        .then(token => {
          resolve(token)
        })
        .catch(err => {
          reject(err);
        })
    });
  }

  const getByTokenAndUser = (token) => {
    return new Promise((resolve, reject) => {
      RefreshTokenModel.findOne({
        where: {
          refresh_token: token,
        }
      })
        .then(token => {
          resolve(token);
        })
        .catch(err => {
          reject(err);
        })
    });
  }

  const revoke = (token) => {
    return new Promise((resolve, reject) => {
      RefreshTokenModel.destroy({
        where: {
          refresh_token: token
        }
      })
        .then(deleted => {
          resolve(deleted);
        })
        .catch(err => {
          throw err;
          // reject(err);
        });
    });
  }

  const getByToken = (token) => {
    return new Promise((resolve, reject) => {
      RefreshTokenModel.findOne({
        where: {
          token: token,
        }
      })
        .then(token => {
          resolve(token);
        })
        .catch(err => {
          reject(err);
        })
    });
  }

  return {
    insert,
    getByTokenAndUser,
    revoke,
    getByToken
  }
}

module.exports = RefreshTokenService();
