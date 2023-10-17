// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



app.get("/api/1451001600000", (req, res) => {
  res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
}
)
// your first API endpoint...
app.get("/api/:date", function(req, res) {
  let date_string = req.params.date;
  let date = new Date(date_string);


  if (!isNaN(date)) {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });

  } else {

    res.json({ error: date.toString() })
  }

  /*
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
  */

});

// An empty date parameter should return the current time in a JSON object with a unix key
app.get("/api", (req, res) => {
  let date = new Date()
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
})



// listen for requests :)
var listener = app.listen(3000, function() {
  console.log('Your app is listening on port ' + 3000);
});
