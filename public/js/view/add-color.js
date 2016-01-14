var Backbone = require('backbone');
var CommonView = require('./common-view');

var AddColorView = CommonView.extend({

  // el: '#add-color-form',

  template: $('#color-form-tpl'),

  events: {
    'click #add-color-btn': 'addColor'
  },

  constructor: function (collection) {
    this.colorsCollection = collection;
    CommonView.apply(this, arguments);
  },

  initialize: function initAddColorView () {
    if(!this.colorsCollection) throw new Error('You must set this.colorsCollection, a collection representing a list of color models.');
  },

  addColor: function doAddColor (e) {
    e.preventDefault();
    var input = this.$el.find('#color-input');
    this.colorsCollection.create({
      color: '#' + input.val()
    }/*, { 
      wait: true 
    }*/);
    input.val('');
  }
});
  
module.exports = AddColorView;
