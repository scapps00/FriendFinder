var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

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

exports.add = function(req, res) {
	var newPerson = req.body;
	fs.readFile(path.join(__dirname, "../data/friends.js"), (err, data) => {
		if (err) throw err;
		var friends = JSON.parse(data);
		var match = friends[compare(friends, newPerson)];
		res.send(match);
		friends.push(newPerson);
		fs.writeFile(path.join(__dirname, "../data/friends.js"), JSON.stringify(friends), (err) => {
			if (err) throw err;
		});
	});
}