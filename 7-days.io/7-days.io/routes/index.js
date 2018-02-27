"use strict";
var krakendb = require("krakendb")
  , rand = require("kraken-random")
  , logmkr = require("logmaker")
  , express = require("express")
  , router = express.Router();
logmkr.enable(),
  krakendb.dbexists("users") ? (krakendb.loaddb("users"),
    krakendb.activeDB("users")) : (krakendb.newdb("users", ["email", "password", "loggedIn", "userid"]),
      krakendb.exportdb("users"));
let title = "7-days.io";
router.get("/", function (a, b) {
  b.render("index", {
    title: title
  })
}),
  router.get("/account", function (a, b) {
    b.render("account", {
      title: title
    })
  }),
  router.get("/help", function (a, b) {
    b.render("help", {
      title: title
    })
  }),
  router.get("/login", function (a, b) {
    b.render("login", {
      title: title,
      data: {
        un: null,
        pw: null
      }
    })
  }),
  router.get("/signup", function (a, b) {
    b.render("signup", {
      title: title,
      data: {
        email: null,
        un: null,
        pw: null
      }
    })
  }),
  router.get("/editor", function (a, b) {
    b.render("editor", {
      title: title
    })
  }),
  router.post("/login", function (a, b) {
    var d = {
      un: a.body.un,
      pw: a.body.pw
    };
    let e = login(d);
    !0 === e ? b.render("account", {
      title: title,
      user: a.body.un
    }) : b.render("login", {
      title: title,
      data: e
    })
  }),
  router.post("/signup", function (a, b) {
    var d = {
      un: a.body.un,
      email: a.body.email.toLowerCase(),
      pw: a.body.pw,
      pwc: a.body.pwc
    }
      , e = validate(d);
    !0 === e ? b.render("account", {
      title: title,
      user: a.body.un
    }) : b.render("signup", {
      title: title,
      data: e
    })
  }),
  router.post("/", function (a, b) {
    krakendb.setItem(a.body.un, "loggedIn", "f"),
      krakendb.exportdb("users"),
      b.redirect("/")
  });
function login(a) {
  let b = {
    un: null,
    pw: null
  };
  return krakendb.indb(a.un) ? krakendb.getItem(a.un, "password") == a.pw ? (krakendb.setItem(a.un, "loggedIn", "t"),
    krakendb.exportdb("users"),
    b = !0) : b.pw = "Incorrect password" : b.un = "User does not exist",
    b
}
function validate(a) {
  let b = {
    un: null,
    email: null,
    pw: null
  };
  if (!!krakendb.indb(a.email))
    b.email = "Email is already in use";
  else if (!!krakendb.indb(a.un))
    b.un = "Username taken";
  else if (a.pw != a.pwc)
    b.pw = "Passwords do not match";
  else if (6 <= a.pw.length) {
    logmkr.log("Sign up attempt"),
      krakendb.newEntry(a.un),
      krakendb.setItem(a.un, "email", a.email),
      krakendb.setItem(a.un, "password", a.pw),
      krakendb.setItem(a.un, "loggedIn", "t");
    let c = ""
      , d = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-*";
    for (let e = 0; e < rand.random(5, 25); e++)
      c += d[Math.floor(rand.random(d.length))];
    krakendb.setItem(a.un, "userid", c),
      krakendb.exportdb("users"),
      b = !0
  } else
    b.pw = "At least 6 characters are required";
  return b
}
function addUsrItem(a) {
  var b = ""
    , c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-*";
  for (let d = 0; d < Math.floor(25 * Math.random()); d++)
    b += c[Math.floor(Math.random() * c.length)];
  krakendb.setItem(a, "userid", b)
}
module.exports = router;
