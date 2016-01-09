var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');
var CommonView = require('./common-view');
var CountView = require('./count'); // FIXME: name is a bit confusing since this is really the init method

var initBox = function init (countModel, colorsCollection) {

  var Box = CommonView.extend({
    
    // TODO: have a model that holds both the collection and the count module(?)
    colorsCollection: colorsCollection,
    countModel: countModel,
    
    // el: $('.content'), // set in parent view

    template: $('#box-tpl'),

    childViews: [],

    initialize: function initBox () {
      this.listenTo(this.countModel, 'change', this.changeColor);
      this.on('view:rendered', this.onRendered); // TODO: do I need to remove this?
    },

    onRendered: function onRender (el) {
      this.setCountView(CountView, this.countModel, this.colorsCollection);
    },

    setCountView: function doSetCountView (view, count, colors) {
      var CountView = view(count, colors); // init

      // FIXME: tightly coupled to dom: doing this so it will have a class attr...
      this.countView = new CountView({el: this.$el.find('#incr-count')});
    },

    changeColor: function changeBoxColor (e) {
      var index = this.countModel.get('count');
      var colorModel = this.colorsCollection.at([index]);
      var color = colorModel.get('color');
      console.log('color: ' + color);

      if(colorModel) {
        this.$el.find('.box').css('background-color', color);
      }
    }

  });

  return Box;
};

module.exports = initBox;