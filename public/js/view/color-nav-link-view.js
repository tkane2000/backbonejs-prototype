var Backbone = require('backbone');
var mustache = require('mustache');

var CommonView = require('./common-view');

var ColorNavLinkView = CommonView.extend({
  defaultBgColor: null,
  $btn: null,
  tagName: 'li',
  attributes: {
    class: 'color-nav-link'
  },
  template: $('#color-nav-link-tpl'),
  events: {
    'click button': 'highlight'
  },
  constructor: function colorNavConstr (color, index) {
    this.model = color;
    this.index = index;
    CommonView.apply(this);
  },
  initialize: function initColorNavLinkView (argument) {
    this.listenTo(this, 'view:rendered', this.onRendered);
  },
  onRendered: function doOnRendered (argument) {
    this.$btn = this.$el.find('button');
    if(this.$btn && this.$btn.length > 1) throw new Error('The color nav link needs a button element!');
    this.defaultBgColor = this.$btn.css('background-color');
  },
  highlight: function doChangeColor (event) {
    console.log('ColorNavLinkView: changeColor');
    this.$btn.css('background-color', this.model.get('color'));
    this.trigger('view:color-nav:link-clicked', this);
  },
  unHighlight: function doUnHighlight () {
    this.$btn.css('background-color', this.defaultBgColor);
  }
});

module.exports = ColorNavLinkView;