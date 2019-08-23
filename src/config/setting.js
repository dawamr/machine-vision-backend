

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
  
  /**
   * Get environment variable value
   * @param name
   * @param defaultValue
   * @returns {string}
   */
  function getEnv(name, defaultValue) {
    var uc = name.toUpperCase();
    var lc = name.toLowerCase();
    return process.env[uc] || process.env[lc] || defaultValue;
  }
  
  /**
   * Get NODE_ENV environment variable
   * @returns {string}
   */
  function getNodeEnv() {
    var env = config.env;
    return String(env).toLowerCase();
  }
  
  /**
   * Get database config
   * @returns {*}
   */
  function getDatabaseConfig() {
    return config.database;
  }
  
  /**
   * Check whether the current environment is development
   * @returns {boolean}
   */
  function isDevelopment() {
    return getNodeEnv() == 'development';
  }
  
  /**
   * Check whether the current environment is development
   * @returns {boolean}
   */
  function isProduction() {
    return getNodeEnv() == 'production';
  }
  
  function getJWTExpired() {
    return config.jwtExpired;
  }
  
  function getJWTSecret() {
    return config.jwtSecret;
  }
  
  function getUserUploadPath() {
    return config.userUploadPath;
  }
  function getStaticUrlEbook() {
    return config.staticUrlEbook;
  }
  
  function getStaticUrlUserPhoto() {
    return config.staticUrlUserPhoto;
  }
  
  function getStaticUrlThumbnail() {
    return config.staticUrlThumbnail;
  }
  
  function getEvidenceUploadPath() {
    return config.evidenceUploadPath;
  }
  
  function getStaticUrlEvidence() {
    return config.staticUrlEvidence;
  }
  
  function getStaticUrlCashEvidence() {
    return config.staticUrlCashEvidence;
  }
  
  function getCashEvidenceUploadPath() {
    return config.cashEvidenceUploadPath;
  }
  
  function getGCMApiKey() {
    return config.gcmApiKey;
  }
  
  function getGCMSenderId() {
    return config.gcmSenderId
  }
  
  function getGoogleConfig() {
    return config.google;
  }
  
  function getBaseUrl() {
    return config.baseUrl
  }
  
  function getPath(key) {
    return getBaseUrl() + config.path[key];
  }
  
  function getKilatStorageConfig() {
    return config.kilatStorage;
  }
  
  
  module.exports = {
    db: getDatabaseConfig,
    port: getPort,
    host: getHost,
    env: getEnv,
    nodeEnv: getNodeEnv,
    isDevelopment: isDevelopment,
    isProduction: isProduction,
    jwtSecret: getJWTSecret,
    getJWTExpired: getJWTExpired,
    getUserUploadPath: getUserUploadPath,
    getStaticUrlEbook: getStaticUrlEbook,
    getStaticUrlUserPhoto: getStaticUrlUserPhoto,
    getStaticUrlThumbnail: getStaticUrlThumbnail,
    getEvidenceUploadPath: getEvidenceUploadPath,
    getStaticUrlEvidence: getStaticUrlEvidence,
    getStaticUrlCashEvidence: getStaticUrlCashEvidence,
    getCashEvidenceUploadPath: getCashEvidenceUploadPath,
    getGCMApiKey: getGCMApiKey,
    getGCMSenderId: getGCMSenderId,
    getGoogleConfig,
    getBaseUrl,
    getPath,
    getKilatStorageConfig
  };
  
