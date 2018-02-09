'use strict';
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('login', { title: '7-days.io' });
});
module.exports = router;
