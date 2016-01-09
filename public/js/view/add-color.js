var Backbone = require('backbone');
var CommonView = require('./common-view');

module.exports = function init (colors) {

  var AddColorView = CommonView.extend({

    // el: '#add-color-form',

    template: $('#color-form-tpl'),

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
  
  return AddColorView;

};
