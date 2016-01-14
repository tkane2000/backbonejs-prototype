var Backbone = require('backbone');
var _ = require('underscore');

var ColorNavLinkView = require('./color-nav-link-view');
var mustache = require('mustache');
var CommonView = require('./common-view');

var ColorNavView = CommonView.extend({
  template: $('#color-nav-tpl'),

  tagName: 'nav',
  
  collection: null,
  countModel: null,
  
  attributes: {
    'class': 'color-nav'
  },
  constructor: function colorNavConstr (colorCollection, count) {
    this.collection = colorCollection;
    this.countModel = count;

    this.listenTo(this, 'view-rendered', this.onRendered);

    CommonView.call(this);
  },
  initialize: function initColorNav (argument) {
    if(!this.collection) throw new Error('Set collection.');
    this.listenTo(this.collection, 'update', this.onUpdate);
    this.listenTo(this.countModel, 'change', this.onCountChanged);
  },
  onRender: function renderColorNav () {
    if(this.collection.length > 0) this.addLinkViews(this.collection);

    return this;
  },
  onUpdate: function doOnUpdate (collection, options) {
    this.destroyList(this.children, _.bind(function (argument) {
      this.children.length = 0;
    }, this));
    if(collection.length > 0) this.addLinkViews(collection);
  },
  addLinkViews: function doAddLinkViews (collection) {
    var parentEl = this.$el.find('ul');

    collection.each(function renderBtns (color, index) {
      var link = new ColorNavLinkView(color, index);
      this.addChild(link);
      this.listenTo(link, 'view:color-nav:link-clicked', this.onBtnClicked);
      parentEl.append(link.render().$el);
    }, this);

  },
  onCountChanged: function doOnCountChanged (model) {
    var i = this.countModel.get('count');
    var prevI = this.countModel.previous('count');
    if(prevI !== null) this.children[prevI].unHighlight();
    this.children[i].highlight();
  },
  onBtnClicked: function doOnBtnClicked (link) {
    this.countModel.set({count: link.index});
  }

});

module.exports = ColorNavView;