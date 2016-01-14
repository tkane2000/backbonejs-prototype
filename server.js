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
  var id = getId();
  var entry = {
    id: id,
    color: fixedHex
  };
  
  arr[id] = entry;

  return entry;
}

function getId () {
  return idCount++;
}

app.get('/api/v1/colors/:id', function getColors (req, res, next) {
  var id = req.params.id;
  
  console.log('get: /api/v1/colors: id: ' + id);

  res.type( 'json');

  if(colors[id]){
    res.send(colors[id]);
  } else {
    res.status = "404";
    res.send({error: 'color not found'});
  }
});

app.get('/api/v1/colors', function getColors (req, res, next) {
  console.log('get: /api/v1/colors');
  res.type('json');
  res.send(colors);
});

app.post('/api/v1/colors', function getColors (req, res, next) {
  var record = addColor(colors, req.body.color);
  res.type('json');
  res.send(record);
});

app.get('/*', function getColors (req, res, next) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(3003, function onServer () {
  console.log('serving on port 3003');
});


