var $ = require('jquery');
var Backbone = require('backbone');

module.exports = function init (countModel, colorsCollection) {

  var count = countModel;
  var colors = colorsCollection;

  return Backbone.View.extend({
    
    // TODO: have a model that holds both the collection and the count module(?)
    colorsCollection: colors,
    countModel: count,
    
    el: $('.box'),

    initialize: function initBox () {
      console.log('Box View init <=========');

      this.listenTo(this.countModel, 'change', this.changeColor);
    },

    changeColor: function changeBoxColor (e) {
      var colorModel = this.colorsCollection.at([this.countModel.get('count')]);
      var color = colorModel.get('color');
      console.log('color: ' + color);

      if(colorModel) {
        this.$el.css('background-color', color);
      }
    }

  });
};
