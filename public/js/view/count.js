var Backbone = require('backbone');
var CommonView = require('./common-view');

module.exports = function init (count, colors) {

  var Count = CommonView.extend({
    
    colorsCollection: colors,

    countModel: count,

    // el: $('#incr-count'),

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

  return Count;

};
