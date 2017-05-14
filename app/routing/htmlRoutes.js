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

exports.home = function(req, res) {
			res.sendFile(path.join(__dirname, "../public/home.html"));
		}

exports.survey = function(req, res) {
			res.sendFile(path.join(__dirname, "../public/survey.html"));
		}

exports.friendList = function(req, res) {
			res.sendFile(path.join(__dirname, "../data/friends.js"));
		}


