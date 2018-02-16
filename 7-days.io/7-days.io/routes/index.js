'use strict';
var krakendb = require("krakendb");
var express = require('express');
var router = express.Router();

if (!krakendb.dbexists("users")) {
  krakendb.newdb("users", ["email", "password"])
  krakendb.exportdb("users");
} else {
  krakendb.loaddb("users");
}

let title = "7-days.io";

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: title });
});
router.get('/account', function (req, res) {
  res.render('account', { title: title });
});
router.get('/help', function (req, res) {
  res.render('help', { title: title });
});
router.get('/login', function (req, res) {
  res.render('login', { title: title });
});
router.get('/signup', function (req, res) {
  res.render('signup', { title: title, data: { email: null, un: null, pw: null } });
});

router.post('/signup', function (req, res, next) {
  var data = {
    un: req.body.un,
    email: req.body.email,
    pw: req.body.pw,
    pwc: req.body.pwc
  }

  var err = validate(data);
  console.log(err);

  if (err) {
    res.render("account", { title: title, user: req.body.un })
    // res.redirect("account", { title: title, user: req.body.un })
  } else {
    res.render("signup", { title: title, data: err })
  }
});

function validate(data) {
  let fail = {
    un: null,
    email: null,
    pw: null
  }
  if (!krakendb.isset(data.email)) {
    if (krakendb.indb(data.un)) {
      fail.un = "Username taken"
    } else {
      if (data.pw != data.pwc) {
        fail.pw = "Passwords do not match";
      } else {
        if (data.pw.length < 6) {
          fail.pw = "At least 6 characters are required"
        } else {
          //continue
           krakendb.newEntry(data.un);
           krakendb.setItem(data.un, "email", data.email);
           krakendb.setItem(data.un, "password", data.pw);
           krakendb.exportdb("users");
          return true;
        }
      }
    }
  } else {
    fail.email = "Email already in use";
  }

  return fail;
}

module.exports = router;
