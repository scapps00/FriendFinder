//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");

//sets up express app
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.get("/survey", function(req, res) {
	res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

app.post("/api/add", function(req, res) {
	var newPerson = req.body;
	fs.readFile(path.join(__dirname, "/app/data/friends.js"), (err, data) => {
		if (err) throw err;
		var friends = JSON.parse(data);
		friends.push(newPerson);
		fs.writeFile(path.join(__dirname, "/app/data/friends.js"), JSON.stringify(friends), (err) => {
			if (err) throw err;
		});
	});	
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});