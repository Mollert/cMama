
var express = require("express");
var request = require('request');
var router = express.Router();


// To home page
router.get("/", function(req, res) {
	res.render("index");
});

module.exports = router;