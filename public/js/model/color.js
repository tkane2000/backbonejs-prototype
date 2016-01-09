var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  initialize: function initColor () {
    this.on('request', function onColorRequest () {
      console.log('Color: on: request');
    });
  }
});