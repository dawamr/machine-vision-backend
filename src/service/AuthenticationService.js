

const Promise = require('bluebird');
const md5 = require('md5');
const bcrypt = require('bcrypt-nodejs');
const SaltLength = 9;

const User = require('./../models').user;
const role = require('./../models').role;

/**
 * Authentication Service
 *
 * @returns {{authenticate: authenticate, compareDigest: compareDigest}}
 * @constructor
 */
function AuthenticationService() {

  /**
   * Authenticate user, only returns the user ID upon success
   *
   * @param identifier
   * @param credentials
   * @returns {bluebird|exports|module.exports}
   */
  const authenticate = (username, password) => {

    let auth = User.findOne({
      include: [{
        model: role,
      }],
      where: {
            username: username
      }
    });


    return new Promise(function (resolve, reject) {
      auth.then(function (data) {
        if (data) {
          if (bcrypt.compareSync(password, data.password)) {
            resolve(data);
          } else {
            reject(Error('Username or password not match.'));
          }

        } else {
          reject(Error('Username not register.'));
        }
      })
        .catch(function (e) {
          reject(e);
        });
    });
  };

  /**
   * Compare message and it's message digest
   *
   * @param message
   * @param digest
   * @returns {boolean}
   */
  const compareDigest = function (message, digest) {
    let hashed = md5(message);
    return hashed === digest;
  };

  const createHash = function (password) {
    // let salt = generateSalt(SaltLength);
    // let hash = md5(password + salt);
    return bcrypt.hashSync(password);;
  };

  const validateHash = function (password, hash) {
    // let salt = hash.substr(0, SaltLength);
    // let validHash = salt + md5(password + salt);
    return bcrypt.compareSync(password, hash);
  };

  const generateSalt = function (len) {
    let set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ',
      setLen = set.length,
      salt = '';
    for (let i = 0; i < len; i++) {
      let p = Math.floor(Math.random() * setLen);
      salt += set[p];
    }
    return salt;
  };

  return {
    authenticate,
    compareDigest,
    createHash,
    validateHash,
  }
}

module.exports = AuthenticationService();
