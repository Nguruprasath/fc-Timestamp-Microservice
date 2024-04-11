// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function (req, res) {
  let currentUnix = new Date().getTime();
  let currentUtc = new Date().toUTCString();
  res.json({"unix": currentUnix, "utc": currentUtc});
});
/*
Extra Comments
*/
// API endpoint to handle date string input
app.get("/api/:date_string", (req, res) => {
  let dateString = req.params.date_string;
  let unixPattern = /\d{5,}/; // Regular expression to check for Unix timestamp
    if (unixPattern.test(dateString)) { // Check if input is a Unix timestamp
      let dateNum = parseInt(dateString); // Convert Unix timestamp string to number
      res.json({"unix": dateNum, "utc": new Date(dateNum).toUTCString()}); // Return JSON with Unix timestamp and UTC date
    } else {
      let inputDate = new Date(dateString); // Create Date object from input string
      if (inputDate.toString() === "Invalid Date") { // Check if input date is invalid
        res.json({error: "Invalid Date"}); // Return JSON with error message for invalid date
      } else {
        res.json({"unix": inputDate.getTime(), "utc": inputDate.toUTCString()}); // Return JSON with timestamp and UTC date for valid input date
      };
    };
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
