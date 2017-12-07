
// var express = require("express");
// var request = require('request');
// var router = express.Router();

var bakery = require("../data/bakery.js");
var drink = require("../data/drink.js");
var navagate = require("../data/navagate.js");
var sandwich = require("../data/sandwich.js");
var side = require("../data/side.js");

module.exports = function(app) {
	// Get Bakery Products
	app.post("/selections/bakeryData", function(req, res) {
			var bakeryData = req.body;
			console.log(bakeryData);

		res.render("bakery", {navagate, bakery});
	});

	// Get Lunch Menu
	app.post("/selections/lunchData", function(req, res) {
			var lunchData = req.body;
			console.log(lunchData);

		res.render("lunch", {navagate, sandwich, side, drink});
	});
};

// module.exports = router;