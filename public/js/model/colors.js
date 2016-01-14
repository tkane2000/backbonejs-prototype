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

    // this.listenTo(this, 'all', function onColorsEvent (eventName) {
    //   console.log('Colors: on: ' + eventName);
    // });
    
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
      // console.log('collection: ' + JSON.stringify(collection));
      // console.log('res: ' + JSON.stringify(res));
      // console.log('options: ' + JSON.stringify(options));
    }, this);

  }
  
});