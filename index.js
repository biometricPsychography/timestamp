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



app.get("/api/", function (req, res) {
    let now = new Date();

    let unixTimeFormat = now.getTime();
    let utcTimeFormat = now.toUTCString();



    res.json({ unix: unixTimeFormat, utc: utcTimeFormat })
});

app.get('/api/:potentialTime', (req, res) => {




    let potentialTime = req.params.potentialTime;
    console.log(potentialTime)

    let parsedDateString = new Date(potentialTime);
    let parsedDateNumber = new Date(parseInt(potentialTime, 10));

    if (parsedDateString != 'Invalid Date') {


        let unixTimeFormat = parsedDateString.getTime();
        let utcTimeFormat = parsedDateString.toUTCString();

        res.json({ unix: unixTimeFormat, utc: utcTimeFormat })

        


    } else if (parsedDateNumber != 'Invalid Date') {
        let unixTimeFormat = parsedDateNumber.getTime();
        let utcTimeFormat = parsedDateNumber.toUTCString();

        res.json({ unix: unixTimeFormat, utc: utcTimeFormat })
    } else {
        res.json({ error: 'Invalid Date' });
    }
    



});


const PORT = 8080;
// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + PORT);
});
