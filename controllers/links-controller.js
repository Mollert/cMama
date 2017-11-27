
var express = require("express");
var request = require('request');
var router = express.Router();


// To home page
router.get("/", function(req, res) {
	res.render("index");
});

// To bakery page
router.get("/bakery", function(req, res) {
  res.render("bakery");
});

// To lunch page
router.get("/lunch", function(req, res) {
  res.render("lunch");
});

// To login page
router.get("/login", function(req, res) {
  res.render("login");
});

module.exports = router;