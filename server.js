
var express = require("express");
var request = require("request");
var exphbs = require("express-handlebars");
var path = require("path");
var bodyParser = require("body-parser");
var validator = require("express-validator");
var session = require("express-session");

var app = express();
var router = express.Router();
var port = process.env.PORT || 4800;

app.use(bodyParser.urlencoded({extended: false}));
app.use(validator());
app.use(express.static(path.join(__dirname ,"public")));
app.use(session({secret: "howaboutthissecret", resave: false, saveUnintialized: false}));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname ,"views"));

var routes = require("./controllers/cMama-controller.js");

app.use("/", routes);
app.use("/bakery", routes);
app.use("/lunch", routes);
app.use("/login", routes);
app.use("/bakeryData", routes);
app.use("/lunchData", routes);


app.listen(port, function() {
  console.log("Listening closely on port " + port);
});
