
var express = require("express");
var request = require('request');
var router = express.Router();

var bakery = require("../data/bakery.js");
var customers = require("../data/customers.js");
var drink = require("../data/drink.js");
var navagate = require("../data/navagate.js");
var sandwich = require("../data/sandwich.js");
var side = require("../data/side.js");

// To home page
router.get("/", function(req, res) {
	res.render("index", {navagate});
});

// To bakery page
router.get("/bakery", function(req, res) {
  res.render("bakery", {navagate, bakery});
});

// To lunch page
router.get("/lunch", function(req, res) {
  res.render("lunch", {navagate, sandwich, side, drink});
});

// To login page
router.get("/login", function(req, res) {
  res.render("login", {navagate,
		helpers: {message: function () {
			return '<div class="alert alert-info" role="alert"><img src="/image/question.png" alt="The Question" width="80px" height="80px"><br><strong>It doesn\'t look like you\'ve logged in yet.<br>What are you waiting for?</strong></div>';
			}
		}
	});
});






// Login
router.post("/login/in", function(req, res) {
	theEmail = req.body.emailEntry;
	thePassword = req.body.passwordEntry;

	var emailCheck =  /^[a-zA-Z0-9_\.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9\.]{2,4}$/;
	var didEmailPass = emailCheck.test(theEmail);

	if (didEmailPass) {
		for ( i=0 ; i<customers.length ; i++ ){
			if (customers[i].email === theEmail) {
				if (customers[i].password === thePassword) {
					console.log("yes");
					res.render("login", {navagate});
				} else {
					console.log("no");
					res.render("login", {navagate});					
				}
			}
		}

	}
});



module.exports = router;