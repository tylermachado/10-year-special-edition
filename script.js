var request	=	require("request"),
	fs = 		require('fs'),
	moment =	require('moment'),
	nodemailer = require("nodemailer"),
	dotenv =	require('dotenv').config(),
	express=	require('express'),
	app =		express();

var user = process.env.USERNAME,
	apiKey = process.env.APIKEY,
	yearsBack = process.env.YEARSBACK;

var now = Date.now();
var pastFrom = moment().subtract(yearsBack, "years").unix();
var pastTo 	 = moment().subtract(yearsBack, "years").add(7, "days").unix();

var url = "http://ws.audioscrobbler.com/2.0/?method=user.getweeklyalbumchart" + 
			"&user=" + user + 
			"&from=" + pastFrom + 
			"&to=" + pastTo + 
			"&api_key=" + apiKey + 
			"&format=json";

request(url, function (error, response, body) {
	if (!error) {
    
    var list = JSON.parse(body);
    
    list = list.weeklyalbumchart.album;
    
    var array = [];
    
    for (var i=0; i<10; i++) {
      array.push(list[i].artist["#text"] + ", " + list[i].name)
    }
    
		app.get('/', function (req, res) {
      res.send(array);
    });
	} else {
		console.log("We’ve encountered an error: " + error);
	}
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});



	
