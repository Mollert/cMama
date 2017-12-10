
var express = require("express");
var request = require('request');
var router = express.Router();

var bakery = require("../data/bakery.js");
var drink = require("../data/drink.js");
var navagate = require("../data/navagate.js");
var sandwich = require("../data/sandwich.js");
var side = require("../data/side.js");

function selection (items) {
	var keyValue = {};
	for (var [key, value] of Object.entries(items)) {
		if (value) {
			if (value !== "0") {
				keyValue[key] = value;
			}
		}
	}
	return keyValue;
};

function transform(a, b, c) {
	return {
		quantity: a,
		name: b,
		price: c
	}
};



// Get Bakery Products
router.post("/bakeryData", function(req, res) {
	var bakeryData = req.body;
	console.log(bakeryData);

	var orderBakery = selection(bakeryData);
	console.log(orderBakery);

	for (var k in orderBakery) {
		for (i=0; i<bakery.length;i++) {
			if (k === bakery[i].identifier) {
				var name = bakery[i].name;
				var price = bakery[i].cost;
				var quantity = (orderBakery[k]);
				console.log(name + ": " + price + ": " + quantity);
			}
		}
	}




	res.render("receipt", {navagate, bakery});
});

// Get Lunch Menu
router.post("/lunchData", function(req, res) {
	var lunchData = req.body;
	console.log(lunchData);

	var orderLunch = selection(lunchData);
	console.log(orderLunch);
	

	res.render("receipt", {navagate, sandwich, side, drink});
});


module.exports = router;