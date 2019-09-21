const express = require('express')
const router = express.Router();
const upload = require('../utils/upload');
const config = require('../config/config.json')
const resp = require('../views/response');

router.post('/', upload.single('file'), function(req, res, next) {
  if(!req.file) {
    res.status(500);
    return next(!req.file);
  }

  let fileUrl = 'http://' + config.development.host + ':8000/images/' + req.file.filename
  resp.ok(true, "Success upload file", fileUrl, res);
});

module.exports = router;
