var Backbone = require('backbone');
var HpView = require('../view/hp-view');
var AboutView = require('../view/about-view');
var BoxContainerView = require('../view/box-container-view');

var Colors = require('../model/colors');

var SiteRouter = Backbone.Router.extend({
  curView: null,
  models: {
    colors: null
  },
  routes: {
    'about': function aboutRoute () {
      console.log('router: about');
      this.renderView(AboutView); // , {el: '.content'}
    },
    'color': function colorRoute () {
      console.log('router: color');
      
      // var bvc = (new Backbone.Model(), this.colors); // init
      this.renderView(BoxContainerView);
    },
    '': function hpRoute () {
      console.log('router: hp');
      this.renderView(HpView);
    }
  },
  renderView: function doRenderView (View, options) {
    if(this.curView) {
      this.curView.destroy();
    }
    this.curView = new View(options);
    $('#main').html(this.curView.render().el);
  },
  /*
  execute: function(callback, args, name) {
    console.log('SiteRouter: execute');
  },
  */
  initialize: function initRouter (options) {
    console.log('router: initialize');

    // TODO: this.models.colors = new Colors();

    // FIXME: this doesn't do anything
    // this.on('route:about', function onFoo () {
    //   console.log('on about <----');
    // });
  }
});

module.exports = SiteRouter;
