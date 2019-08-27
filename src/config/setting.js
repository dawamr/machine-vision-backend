

var exceptions = require('../helpers/exeptions');
var fs = require('fs');


try {
    var config = require('../../.config');
  } catch (e) {
    var configError = 'Could not find config file. Please make sure `.config.js` exists on your root directory.' +
      'You can also create new config from template file `.config.js.example`.';
    throw Error(configError);
  }
  
  /**
   * Get port where the application server runs on
   * @returns {string}
   */
  function getPort() {
    return config['app']['port'];
  }
  
  /**
   * Get host where the application server runs on
   * @returns {string}
   */
  function getHost() {
    return config['app']['host'];
  }
  
  function getJWTExpired() {
    return config.jwtExpired;
  }
  
  function getJWTSecret() {
    return config.jwtSecret;
  }
  
  
  
  module.exports = {
    port: getPort,
    host: getHost,
    jwtSecret: getJWTSecret,
    getJWTExpired: getJWTExpired
  };
  
