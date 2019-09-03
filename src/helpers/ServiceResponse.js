const _ = require('lodash');

function ServiceResponse() {
  return (req, res, next) => {
    let data = [];
    const rawData = req.data;

    if (Array.isArray(rawData)) {
      if (rawData)
        _.forEach(rawData, r => {
          data.push(r)
        });
    } else {
      data = rawData;
    }

    let jsonRes = {
      status: true,
      message: _.get(req.response, 'message', 'OK'),
      data: data
    };


    if (req.token) {
      jsonRes.data.token = req.token;
    }

    if (req.refresh_token) {
      jsonRes.data.refresh_token = req.refresh_token;
    }

    res.status(_.get(req.response, 'code', 200));
    res.json(jsonRes);
  };
}

module.exports = ServiceResponse();
