'use strict';

const API_LOG_MODULE = "api"

exports.ok = function(success, message, data, res) {
  var response = {
      'success': success,
      'message': message,
      'data': data
  };
  res.json(response);
  res.end();
};