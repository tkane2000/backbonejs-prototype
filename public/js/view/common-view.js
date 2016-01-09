var Backbone = require('backbone');
var _ = require('underscore');

var CommonView = Backbone.View.extend({
  constructor: function CommonViewConstr () {
    this.children = [];
    Backbone.View.apply(this, arguments);
  },
  initialize: function initCommonView () {
    console.log('initCommonView <====');
  },
  render: function renderCommonView () {

    if(this.template && this.el) {

      this.$el.html(
        _.template(
          this.template.html(), // TODO: expects a jQuery object.  Test and allow string selector as well
          (this.model ? this.model : {})
        )
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
    _.each(this.children, function destroyChildren (childView) {
      childView.destroy();
    });

    if(this.children) console.log('this.children.length: ' + this.children.length);

    this.remove();
  },
  addChild: function doAddChild (view) {
    this.children.push(view);
    return this;
  }
});

module.exports = CommonView;