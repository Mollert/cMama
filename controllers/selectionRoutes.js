
var express = require("express");
var request = require('request');
var router = express.Router();

var bakery = require("../data/bakery.js");
var drink = require("../data/drink.js");
var navagate = require("../data/navagate.js");
var sandwich = require("../data/sandwich.js");
var side = require("../data/side.js");

var which = {};
var itemAmount = 0;
var capture = {};
var receipt = [];
var total = 0;
var show = true;
var allTotals = {};

function selection(items) {
	var keyValue = {};
	for (var [key, value] of Object.entries(items)) {
		if (value) {
			if (value !== "0") {
				keyValue[key] = value;
			}
		}
	}
	return keyValue;
}

function transform(quant, nam, many, cstE, cstA) {
	return {
		quantity: quant,
		name: nam,
		multi: many,
		cost: cstE,
		price: cstA
	}
}

function addingItUp(tot) {
	tot = Number(tot);
	var tx = tot * 0.01;
	var gTot = tot + tx;
	tot = tot.toFixed(2);
	tx = tx.toFixed(2);
	gTot = gTot.toFixed(2);
	return {
		total: tot,
		tax: tx,
		grandTotal: gTot
	}
}

// Get Bakery Products
router.post("/bakeryData", function(req, res) {
	var bakeryData = req.body;
//	console.log(bakeryData);
	var orderBakery = selection(bakeryData);
//	console.log(orderBakery);
	
	which = {title: "bakery"};

	for (var k in orderBakery) {
		for ( i=0 ; i<bakery.length ; i++ ) {
			if (k === bakery[i].identifier) {
				itemAmount = (bakery[i].cost * orderBakery[k]);
				total = total + (itemAmount * 1);
				if (orderBakery[k] === "1") {
					show = false;
				}		
				capture = transform(orderBakery[k], bakery[i].name, show, bakery[i].cost, itemAmount.toFixed(2));
				receipt.push(capture);
				show = true;
			}
		}
	}
	allTotals = addingItUp(total);
//	console.log(receipt);
//	console.log(allTotals);
	res.render("receipt", {navagate, which, receipt, allTotals});
});

// Get Lunch Menu
router.post("/lunchData", function(req, res) {
	var lunchData = req.body;
//	console.log(lunchData);

	var orderLunch = selection(lunchData);
//	console.log(orderLunch);
	
	which = {title: "lunch"};

	for (var k in orderLunch) {
		for ( i=0 ; i<sandwich.length ; i++ ) {
			if (k === sandwich[i].identifier) {
				itemAmount = (sandwich[i].cost * orderLunch[k]);
				total = total + (itemAmount * 1);
				if (orderLunch[k] === "1") {
					show = false;
				}		
				capture = transform(orderLunch[k], sandwich[i].name, show, sandwich[i].cost, itemAmount.toFixed(2));
				receipt.push(capture);
				show = true;
			}
		}
		for ( i=0 ; i<side.length ; i++ ) {
			if (k === side[i].identifier) {
				itemAmount = (side[i].cost * orderLunch[k]);
				total = total + (itemAmount * 1);
				if (orderLunch[k] === "1") {
					show = false;
				}		
				capture = transform(orderLunch[k], side[i].name, show, side[i].cost, itemAmount.toFixed(2));
				receipt.push(capture);
				show = true;
			}
		}
		for ( i=0 ; i<drink.length ; i++ ) {
			if (k === drink[i].identifier) {
				itemAmount = (drink[i].cost * orderLunch[k]);
				total = total + (itemAmount * 1);
				if (orderLunch[k] === "1") {
					show = false;
				}		
				capture = transform(orderLunch[k], drink[i].name, show, drink[i].cost, itemAmount.toFixed(2));
				receipt.push(capture);
				show = true;
			}
		}
	}

	allTotals = addingItUp(total);
//	console.log(receipt);
//	console.log(allTotals);
	res.render("receipt", {navagate, which, receipt, allTotals});
});

module.exports = router;