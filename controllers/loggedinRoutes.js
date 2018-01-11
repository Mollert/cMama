
var express = require("express");
var request = require('request');
var router = express.Router();

var customers = require("../data/customers.js");
var navagate = require("../data/navagate.js");

function isCustomer(checkEmail) {
	for ( i=0 ; i<customers.length ; i++ ) {
		if ( checkEmail === customers[i].email ) {
			return true;
		} else {
			return false;
		}
	}
}

function isPassword(checkEmail, checkPassword) {
	for ( i=0 ; i<customers.length ; i++ ) {
		if ( checkEmail === customers[i].email ) {
			if ( checkPassword === customers[i].password ) {
				return true;
			}
		} else {
			return false;
		}
	}
}

// Create new account
router.post("/createAccount", function(req, res) {
	var newEmail = req.body.emailEntry;
	var newPassword = req.body.passwordEntry;

	req.check("emailEntry").isEmail();
	var anyerror = req.validationErrors();

	console.log(anyerror);
	console.log(isCustomer(newEmail));
	console.log(newEmail + " " + newPassword);

	if ( anyerror instanceof Array ) {	
		res.render("login", {navagate, 
			helpers: {message: function () {
				return '<div class="alert alert-danger" role="alert"><img src="/image/bad.png" alt="The Bad" width="80px" height="80px"><br><strong>Oh snap . . . something went wrong.<br>You typed ' + newEmail  + ' for your email.  How about trying again?</strong></div>';
				}
			}
		});
	}
	if ( isCustomer(newEmail) ) {
		res.render("login", {navagate, 
			helpers: {message: function () {
				return '<div class="alert alert-info" role="alert"><img src="/image/exclamation.png" alt="The Exclamation" width="80px" height="80px"><br><strong>' + newEmail + ' You\'ve tryed to create a new account<br>You already have an account, so this time click the login button.</strong></div>';
				}
			}
		});
	}



	req.check("passwordEntry").isLength({min: 5}).matches(/\d/).matches(/\D/);
	anyerror = req.validationErrors();

	console.log(anyerror); // anyerror[0].value - string
//can't set header after they are sent	

//	customers.push({email:newEmail, password:newPassword});

});


// Login
router.post("/login", function(req, res) {
	var theEmail = req.body.emailEntry;
	var thePassword = req.body.passwordEntry;

	console.log(theEmail + " " + thePassword);	

	if ( !isCustomer(theEmail) ) {
		res.render("login", {navagate, 
			helpers: {message: function () {
				return '<div class="alert alert-danger" role="alert"><img src="/image/bad.png" alt="The Bad" width="80px" height="80px"><br><strong>Oh snap . . . something went wrong.<br>You typed ' + theEmail  + ' for your email.  How about trying again?</strong></div>';
				}
			}
		});
	}

	if ( !isPassword(theEmail, thePassword) ) {
		res.render("login", {navagate, 
			helpers: {message: function () {
				return '<div class="alert alert-danger" role="alert"><img src="/image/bad.png" alt="The Bad" width="80px" height="80px"><br><strong>Oh snap . . . something went wrong.<br>Your password did not match your email.  How about trying again?</strong></div>';
				}
			}
		});
	}

console.log("Made it this far");
	
	res.render("login", {navagate, 
		helpers: {message: function () {
			return '<div class="alert alert-success" role="alert"><img src="/image/good.png" alt="The Good" width="60px" height="60px"><strong>You\'re in!<br>Hope you\'re hungry.</strong></div>';
			}
		}
	});
});


// To logout page
router.get("/logout", function(req, res) {			
	res.render("login", {navagate, 
		helpers: {message: function () {
			return '<div class="alert alert-info" role="alert"><img src="/image/exclamation.png" alt="The Exclamation" width="80px" height="80px"><br><strong>Your logged out.<br>Hope to see you again soon.</strong></div>';
			}
		} 
	});
});

module.exports = router;