
// var express = require("express");
// var request = require('request');
// var router = express.Router();

var bakery = require("../data/bakery.js");
var drink = require("../data/drink.js");
var navagate = require("../data/navagate.js");
var sandwich = require("../data/sandwich.js");
var side = require("../data/side.js");

module.exports = function(app) {
	// To home page
	app.get("/", function(req, res) {
		res.render("index", {navagate});
	});

	// To bakery page
	app.get("/bakery", function(req, res) {
	  res.render("bakery", {navagate, bakery});
	});

	// To lunch page
	app.get("/lunch", function(req, res) {
	  res.render("lunch", {navagate, sandwich, side, drink});
	});

	// To login page
	app.get("/login", function(req, res) {
	  res.render("login", {navagate});
	});
};

// module.exports = router;