//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");

//sets up express app
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var htmlRoutes = require("./app/routing/htmlRoutes.js")(app);
var apiRoutes = require("./app/routing/apiRoutes.js")(app);


function compare(oldGuys, newGuy) {
	var differenceArray = [];
	for (var i = 0; i < oldGuys.length; i++) {
		var totalDifference = 0;
		for (var j = 0; j<10; j++) {
			var difference = Math.abs(oldGuys[i].answers[j] - newGuy.answers[j]);
			totalDifference += difference;
		}
		differenceArray.push(totalDifference);
	}
	var closestMatch = Math.min.apply(null, differenceArray);
	var index = differenceArray.indexOf(closestMatch);
	return index;
}

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});