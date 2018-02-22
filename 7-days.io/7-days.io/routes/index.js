'use strict';
var krakendb = require("krakendb");
var rand = require("kraken-random");
var logmkr = require("logmaker");
var express = require('express');
var router = express.Router();

logmkr.enable();

if (!krakendb.dbexists("users")) {
  krakendb.newdb("users", ["email", "password", "loggedIn", "userid"])
  krakendb.exportdb("users");
} else {
  krakendb.loaddb("users");
  krakendb.activeDB("users");
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
  res.render('login', { title: title, data: { un: null, pw: null } });
});
router.get('/signup', function (req, res) {
  res.render('signup', { title: title, data: { email: null, un: null, pw: null } });
});
router.get('/editor', function (req, res) {
  res.render('editor', { title: title });
});


router.post('/login', function (req, res, next) {
  var data = {
    un: req.body.un,
    pw: req.body.pw
  }
  let err = login(data);
  if (err === true) {
    res.render("account", { title: title, user: req.body.un })
    // res.redirect("account", { title: title, user: req.body.un })
  } else {
    res.render("login", { title: title, data: err })
  }
})
router.post('/signup', function (req, res, next) {
  var data = {
    un: req.body.un,
    email: req.body.email.toLowerCase(),
    pw: req.body.pw,
    pwc: req.body.pwc
  }

  var err = validate(data);

  if (err === true) {
    res.render("account", { title: title, user: req.body.un })
    // res.redirect("account", { title: title, user: req.body.un })
  } else {
    res.render("signup", { title: title, data: err })
  }
});

/*
  Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  //Send notification
*/

router.post("/", function (req, res, next) {
  krakendb.setItem(req.body.un, "loggedIn", "f");
  krakendb.exportdb("users")
  res.redirect("/")
})
function login(data) {
  let fail = {
    un: null,
    pw: null
  }

  // login

  if (krakendb.indb(data.un)) {
    if (krakendb.getItem(data.un, "password") == data.pw) {
      //continue

      krakendb.setItem(data.un, "loggedIn", "t");
      krakendb.exportdb("users")

      fail = true;
    } else {
      //incorrect password
      fail.pw = "Incorrect password"
    }
  } else {
    //usr does not exist
    fail.un = "User does not exist"
  }

  return fail;
}
function validate(data) {
  let fail = {
    un: null,
    email: null,
    pw: null
  }
  if (!krakendb.indb(data.email)) {
    if (!krakendb.indb(data.un)) {
      if (data.pw == data.pwc) {
        if (data.pw.length >= 6) {

          //continue

          logmkr.log("Sign up attempt");

          krakendb.newEntry(data.un);
          
          krakendb.setItem(data.un, "email", data.email)
          krakendb.setItem(data.un, "password", data.pw)
          krakendb.setItem(data.un, "loggedIn", "t");

          let str = "";
          let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-*";
          for (let i = 0; i < rand.random(5, 25); i++) {
            str += chars[Math.floor(rand.random(chars.length))];
          }
          krakendb.setItem(data.un, "userid", str)

          krakendb.exportdb("users")

          fail = true;
        } else {
          //password shorter than 6
          fail.pw = "At least 6 characters are required"
        }
      } else {
        //passwords do not match
        fail.pw = "Passwords do not match"
      }
    } else {
      //username taken
      fail.un = "Username taken"
    }
  } else {
    //email taken
    fail.email = "Email is already in use";
  }

  return fail;
}


function addUsrItem(user) {
  var str = "";
  var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-*";
  for (let i = 0; i < Math.floor(Math.random() * 25); i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  krakendb.setItem(user, "userid", str)
}

module.exports = router;