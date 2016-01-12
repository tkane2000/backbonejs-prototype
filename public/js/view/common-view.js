var Backbone = require('backbone');
var _ = require('underscore');
var mustache = require('mustache');

var CommonView = Backbone.View.extend({
  constructor: function CommonViewConstr () {
    this.children = [];
    Backbone.View.apply(this, arguments);
  },
  // initialize: function initCommonView () {
  //   console.log('initCommonView <====');
  // },
  render: function renderCommonView () {

    if(this.template && this.el) {

      this.$el.html(
        mustache.render(this.template.html(), (this.model ? this.model : {}))
        // _.template(
        //   this.template.html(), // TODO: expects a jQuery object.  Test and allow string selector as well
        //   (this.model ? this.model : {})
        // )
      );

      this.trigger('view:rendered', this.el);

      return this;
    } else {
      console.error('CommonView: TEMPLATE NOT RENDERED');
      console.log(' - this.template: ' + this.template);
      console.log(' - this.el: ' + this.el);
    }
  },
  destroy: function destroyView () {
    console.log('destroy: view id/class: ' + (this.$el.attr('id') || this.$el.attr('class')));
    this.destroyList(this.children, _.bind(function onDestroyList () {
      this.children.length = 0;
    }, this));

    if(this.children) console.log('this.children.length: ' + this.children.length);

    this.remove();
  },
  destroyList: function doDestroyList (viewList, callback) {
    _.each(viewList, function destroyView (view) {
      view.destroy();
    });
    if(callback) callback();
  },
  addChild: function doAddChild (view) {
    this.children.push(view);
    return this;
  }
});

module.exports = CommonView;