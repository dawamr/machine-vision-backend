'use strict';

exports.ok = function(success, message, data, res) {
  let response = {
    'success': success,
    'message': message,
    'data': data,
  };
  res.json(response);
  res.end();
};

exports.paging = function(success, message, rows, page, perPage, totalPage, totalData, res) {
  let responsePaging = {
    'success': success,
    'message': message,
    'data': {
      "rows": rows,
		  "page": page,
		  "per_page": perPage,
		  "total_page": totalPage,
      "total_data": totalData
    }
  };
  
  res.json(responsePaging);
  res.end();
};
