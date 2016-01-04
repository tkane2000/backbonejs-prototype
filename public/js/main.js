var Backbone = require('backbone');

var Color = require('./model/color');
var Colors = require('./model/colors');

var Box = require('./view/box');
var CountView = require('./view/count');
var AddColorView = require('./view/add-color');

// Model: ---------------------------------------------------------

var colors = new Colors();
// colors.add({color: '#ccc'});

var count = new Backbone.Model({count: 0});


// Views: ---------------------------------------------------------

Box = Box(count, colors); // init
CountView = CountView(count, colors); // init
AddColorView = AddColorView(colors); // init

var box = new Box();
var counter = new CountView();
var addColor = new AddColorView();

/*
  TODO:
    X: put/post request
    debug create method
    form validation
     X: - defaults on Color model
     - input valid hex (use regex)
    security for put/post requests?
    create appView
      use it to append other views to body tag or content el
    add color picker
    add in router:
       - hp
       - directions
       - etc
    add in templates (nunjucks?)
    X: break out views into separate files
*/








