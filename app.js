var express = require('express');
var app = express();
var path = require('path');
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);
app.use(express.static(__dirname + '/'));

let port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});


app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});