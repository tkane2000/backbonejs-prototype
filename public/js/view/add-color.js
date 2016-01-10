var Backbone = require('backbone');
var CommonView = require('./common-view');

var AddColorView = CommonView.extend({

  // el: '#add-color-form',

  template: $('#color-form-tpl'),

  constructor: function (collection) {
    this.colorsCollection = collection;
    CommonView.apply(this, arguments);
  },

  initialize: function initAddColorView () {
    if(!this.colorsCollection) throw new Error('You must set this.colorsCollection, a collection representing a list of color models.');
  },

  events: {
    'click #add-color-btn': 'addColor'
  },

  addColor: function doAddColor (e) {
    e.preventDefault();
    this.colorsCollection.create({
      color: '#' + this.$el.find('#color-input').val()
    }, { 
      wait: true 
    });
  }
});
  
module.exports = AddColorView;
