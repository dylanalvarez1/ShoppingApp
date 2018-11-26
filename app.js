var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname + '/'));

let port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});


app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});