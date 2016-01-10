var Backbone = require('backbone');

var Color = require('../model/color');
var Colors = require('../model/colors');
var CommonView = require('./common-view');
var Box = require('./box');
var AddColorView = require('./add-color');

var BoxContainerView = CommonView.extend({
  template: $('#box-and-form-tpl'),
  initialize: function initBoxContainerView () {
    this.on('view:rendered', this.onRendered);
  },
  onRendered: function doOnRendered () {

    // FIXME: Instantiating Model here tightly couples view to models.  Let router handle this...
    // Models:
    var colors = new Colors(); // colors.add({color: '#ccc'});
    var count = new Backbone.Model({count: 0});

    // init
    var BoxConstr = Box(count, colors);

    var box = new BoxConstr({el: this.$el.find('#box-container')});
    this.addChild(box);
    box.render();

    var addColor = new AddColorView(colors); // {el: '#add-color-form-container'}

    this.addChild(addColor);
    this.$el.append(addColor.render().el);
  }
});

module.exports = BoxContainerView;