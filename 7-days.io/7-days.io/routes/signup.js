'use strict';
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('signup', { title: '7-days.io' });
});
module.exports = router;
