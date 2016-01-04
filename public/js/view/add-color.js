var Backbone = require('backbone');

module.exports = function init (colors) {
  
  return Backbone.View.extend({

    el: '#add-color-form',

    model: colors,

    events: {
      'click #add-color-btn': 'addColor'
    },

    addColor: function doAddColor (e) {
      e.preventDefault();
      this.model.create({
        color: '#' + this.$el.find('#color-input').val()
      }, { 
        wait: true 
      });
    }
  });

};
