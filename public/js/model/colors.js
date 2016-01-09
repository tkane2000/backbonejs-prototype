var _ = require('underscore');
var Backbone = require('backbone');
var Color = require('./color');

module.exports = Backbone.Collection.extend({
  model: Color,
  url: '/api/v1/colors',
  defaults: function() {
    return {
      color: '#CCC',
    };
  },
  initialize: function initColors () {
    this.fetch();
    
    this.on('request', function onColorRequested (collection, xhr, options) {
      console.log('Colors Collection: on: request');
    }, this);

    this.on('add', function onColorAdded (model, collection, options) {
      console.log('Colors: add');
      // console.log(' - model: ' + JSON.stringify(model));
      // console.log(' - collection: ' + JSON.stringify(collection));
      // console.log(' - options: ' + JSON.stringify(options));
    }, this);
    
    this.on('sync', function onColorSynced (collection, res, options) {
      console.log('Colors: sync');
      console.log('this: ' + this);
      // console.log('collection: ' + JSON.stringify(collection));
      // console.log('res: ' + JSON.stringify(res));
      // console.log('options: ' + JSON.stringify(options));
      
      // TODO: we don't want this to fire after the initial fetch call (or maybe it's ok to just let that happen...feels sloppy)
      // TODO: I thought create takes care of this for us:
      this.set(res); // update new model with ID after create is called
    }, this);


  }
});