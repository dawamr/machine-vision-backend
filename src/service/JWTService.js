

const config = require('../config//setting');
const jwt = require('jsonwebtoken');

/**
 * JWT Service
 *
 * @returns {{encode: encode, decode: decode}}
 * @constructor
 */
function JWTService() {

  /**
   * Generate a new JWT token, accepting payload object containing
   * authentication info (such as user ID)
   *
   * @param payload
   */
  const encode = function (payload) {
    return jwt.sign(payload, config.jwtSecret(), { algorithm: 'HS256', expiresIn: '1h' });
  };

  /**
   * Decode JWT token, returns object if succeed, otherwise returns false
   *
   * @param token
   * @returns {boolean|object}
   */
  const decode = function (token) {

    try {
      const decoded = jwt.verify(token, config.jwtSecret());
      return decoded
    } catch (e) {
      return false;
    }
  };

  return {
    encode,
    decode
  };

}

module.exports = JWTService();
