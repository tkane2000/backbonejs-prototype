var Backbone = require('backbone');
var $ = require('jquery');

var SiteRouter = require('./routes/site-router');

var PrimaryNav = require('./view/primary-nav-view');


// Router: --------------------------------------------------------
var router = new SiteRouter();

// Views: ---------------------------------------------------------

// TODO: use events so nav isn't tightly coupled to router?
PrimaryNav = PrimaryNav(router);
var nav = new PrimaryNav({el: '#primary-nav'});

$(document).ready(function onDomReady () {
    Backbone.history.start({pushState: true});
});

