var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;


// Model: ---------------------------------------------------------
var Color = Backbone.Model;

var Colors = Backbone.Collection.extend({
  model: Color,
  url: '/api/v1/colors',
  initialize: function initColors () {
    this.fetch();
    var that = this;
    this.on('add', function onColorAdded (model, collection, options) {
      console.log(' - model: ' + JSON.stringify(model));
      console.log(' - collection: ' + JSON.stringify(collection));
      console.log(' - options: ' + JSON.stringify(options));
      // that.sync('create', that);
    });
    this.on('sync', _.bind(function onColorSynced (collection, res, options) {
      console.log('collection: ' + JSON.stringify(collection));
      console.log('res: ' + JSON.stringify(res));
      console.log('options: ' + JSON.stringify(options));
      this.set(res); // update new model with ID after create is called
    }, this));
  }
});

var colors = new Colors();
// colors.add({color: '#ccc'});

var count = new Backbone.Model({count: 0});


// Views: ---------------------------------------------------------

var Box = Backbone.View.extend({
  
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

var CountView = Backbone.View.extend({
  
  colorsCollection: colors,

  countModel: count,

  el: $('#incr-count'),

  events: {
    'click': 'incrCount'
  },

  incrCount: function incrementCount () {
    var count = this.countModel.get('count');
    
    count += 1;
    count = (count === this.colorsCollection.length) ? 0 : count;
    
    this.countModel.set('count', count);
    console.log('this.countModel.get(\'count\'): ' + this.countModel.get('count'));
  }

});

var AddColorView = Backbone.View.extend({
  el: '#add-color-form',
  model: colors,
  events: {
    'click #add-color-btn': 'addColor'
  }, 
  addColor: function doAddColor (e) {
      e.preventDefault();
      this.model.create({
        color: '#' + this.$el.find('#color-input').val()
      });
    }
});

var box = new Box();
var counter = new CountView();
var addColor = new AddColorView();

/*
  TODO:
    put/push request
    form validation
    security for put/push requests?
    create appView
      use it to append other views to body tag or content el
    add color picker
    

*/








