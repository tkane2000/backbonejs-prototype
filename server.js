var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());

var colors = [];
var idCount = 0;

addColor(colors, '00f');
addColor(colors, '0f0');
addColor(colors, 'f00');

function addColor (arr, hex) {
  var fixedHex = hex.indexOf('#') > -1 ? hex : '#' + hex;

  arr.push({
    id: getId(),
    color: fixedHex
  });
}

function getId () {
  return idCount++;
}


app.get('/api/v1/colors', function getColors (req, res, next) {
  console.log('get: /api/v1/colors');
  res.type('json');
  res.send(colors);
});

app.post('/api/v1/colors', function getColors (req, res, next) {
  addColor(colors, req.body.color);
  res.type('json');
  res.send(colors);
});

app.get('/*', function getColors (req, res, next) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(3003, function onServer () {
  console.log('serving on port 3003');
});


