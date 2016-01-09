var Backbone = require('backbone');


function init (siteRouter) {
  var PrimaryNavView = Backbone.View.extend({
    events: {
      'click a': 'navigate'
    },
    router: siteRouter,
    navigate: function doNavigate (e) {
      e.preventDefault();
      console.log('PrimaryNavView: navigate');
      var url = $(e.target).attr('href');

      this.router.navigate(url, {trigger: true});
    }
  });

  return PrimaryNavView;
}

module.exports = init;