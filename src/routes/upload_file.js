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

  let fileUrl = 'https://staging-app.machinevision.global/images/' + req.file.filename
  resp.ok(true, "Success upload file", fileUrl, res);
});

module.exports = router;
