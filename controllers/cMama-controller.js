
var express = require("express");
var request = require('request');
var router = express.Router();

var bakery = require("../data/bakery.js");
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
  res.render("login", {navagate});
});

// Get Bakery Products
router.post("/bakeryData", function(req, res) {
		var bakeryData = req.body;
		console.log(bakeryData);

	res.render("bakery", {navagate, bakery});
});

// Get Lunch Menu
router.post("/lunchData", function(req, res) {
		var lunchData = req.body;
		console.log(lunchData);

	res.render("lunch", {navagate, sandwich, side, drink});
});


module.exports = router;