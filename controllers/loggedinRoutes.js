
var express = require("express");
var request = require('request');
var router = express.Router();

var customers = require("../data/customers.js");
var navagate = require("../data/navagate.js");

function isCustomer(checkEmail) {
	for ( i=0 ; i<customers.length ; i++ ) {
		if ( checkEmail === customers[i].email ) {
			return true;
		}
	}
}

function isPassword(checkEmail, checkPassword) {
	for ( i=0 ; i<customers.length ; i++ ) {
		if ( checkEmail === customers[i].email ) {
			if ( checkPassword === customers[i].password ) {
				return true;
			}
		}
	}
}

// Create new account
router.post("/createAccount", function(req, res) {
	var newEmail = req.body.emailEntry;
	var newPassword = req.body.passwordEntry;

	req.check("emailEntry", true).isEmail();
	req.check("passwordEntry", true).isLength({min: 5}).matches(/\d/).matches(/\D/);

	var anyerror = req.validationErrors();
	var errorEmail = false;
	var errorPassword = false;
	var alreadyCustomer = false;
	var lngth = false;	
	var number = false;	
	var letter = false;
	var alertTypeNew = "'alert alert-success'";
	var validationImageNew = "/image/good.png";
	var addMessageNew = "You\'re in!<br>Hope you\'re hungry.";

	if ( anyerror instanceof Array ) {
		if ( anyerror[0].param === "emailEntry" ) {
		errorEmail = true;
		} else if ( anyerror[0].param === "passwordEntry" ) {
		errorPassword = true;			
		}
	}

	alreadyCustomer = isCustomer(newEmail);

	if ( errorPassword ) {
		if ( newPassword.length < 5 ) {
			lngth = true;
		}
		if ( !/[0-9]/.test(newPassword) ) {
			number = true;			
		}
		if ( !/[a-zA-Z]/.test(newPassword) ) {
			letter = true;				
		}
		if ( lngth && !number && !letter ) {
			addMessageNew = "The password must have at least 5 characters.";
		} else if ( lngth && number && !letter) {
			addMessageNew = "The password must have at least 5 characters, one being a number.";
		} else if ( lngth && !number && letter) {
			addMessageNew = "The password must have at least 5 characters, one being a letter.";
		} else if (  lngth && number && letter ) {
			addMessageNew = "The password must have at least 5 characters, one being a number and one being a letter.";
		} else if (  !lngth && number && !letter ) {
			addMessageNew = "The password must consist of at least one number.";
		} else if (  !lngth && number && letter ) {
			addMessageNew = "The password must consist of at least one number and one letter.";
		} else if (  !lngth && !number && letter ) {
			addMessageNew = "The password must consist of at least one letter.";
		} else {
			console.log("Trouble!");				
		}
	}

	if ( errorEmail ) {
		alertTypeNew = "'alert alert-danger'";		
		validationImageNew = "/image/bad.png";	
		addMessageNew = 'The email you entered "' + newEmail + '" is incorrect.';
	}

	if ( alreadyCustomer ) {
		validationImageNew = "/image/exclamation.png";	
		addMessageNew = newEmail + " you\'ve tried to create a new account.<br>But you already have an account, so this time click the login button.";
	}
	
	if (errorPassword ) {
		alertTypeNew = "'alert alert-danger'";		
		validationImageNew = "/image/bad.png";		
	}

	if ( !errorEmail && !errorPassword && !alreadyCustomer ) {
		customers.push({email:newEmail, password:newPassword});
	}

	res.render("login", {navagate, 
		helpers: {message: function () {
			return '<div class=' + alertTypeNew + ' role="alert"><img src=' + validationImageNew + ' alt="The Image" width="80px" height="80px"><strong>&nbsp; &nbsp;' + addMessageNew + '</strong></div>';
			}
		}
	});	
});

// Login
router.post("/login", function(req, res) {
	var theEmail = req.body.emailEntry;
	var thePassword = req.body.passwordEntry;

	var alertTypeExisting = "'alert alert-success'";
	var validationImageExisting = "/image/good.png";
	var addMessageExisting = "You\'re in!<br>Hope you\'re hungry.";

	if ( !isCustomer(theEmail) ) {
		alertTypeExisting = "'alert alert-danger'";
		validationImageExisting = "/image/bad.png";
		addMessageExisting = "You typed " + theEmail  + " for your email.  How about trying again?";
	} else if ( !isPassword(theEmail, thePassword) ) {
		alertTypeExisting = "'alert alert-danger'";
		validationImageExisting = "/image/bad.png";
		addMessageExisting = "Oh snap . . . something went wrong.<br>Your password did not match your email.  How about trying again.";
	}

	res.render("login", {navagate, 
		helpers: {message: function () {
			return '<div class=' + alertTypeExisting + ' role="alert"><img src=' + validationImageExisting + ' alt="The Image" width="80px" height="80px"><strong>&nbsp; &nbsp;' + addMessageExisting + '</strong></div>';
			}
		}
	});
});

// To logout page
router.get("/logout", function(req, res) {			
	res.render("login", {navagate, 
		helpers: {message: function () {
			return '<div class="alert alert-info" role="alert"><img src="/image/exclamation.png" alt="The Exclamation" width="80px" height="80px"><strong>&nbsp; &nbsp;Your logged out.<br>Hope to see you again soon.</strong></div>';
			}
		} 
	});
});

module.exports = router;