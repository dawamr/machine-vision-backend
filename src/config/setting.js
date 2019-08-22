

var exceptions = require('../exceptions');
var fs = require('fs');

try {
  var config = require('../../.config');
} catch (e) {
  var configError = 'Could not find config file. Please make sure `.config.js` exists on your root directory.' +
    'You can also create new config from template file `.config.js.example`.';
  throw Error(configError);
}


function getJWTExpired() {
  return config.jwtExpired;
}

function getJWTSecret() {
  return config.jwtSecret;
}


module.exports = {
  jwtSecret: getJWTSecret,
  getJWTExpired: getJWTExpired
};
