
Backbone.View.prototype.setModel = function(m) {
	if (this.model) {
		this.model.unbind("change", this.render, this);
	}
	this.model = m;
	this.model.bind("change", this.render, this);
	this.render();
};

Backbone.View.prototype.render = function(eventName) {
	if (this.model) {
		$(this.el).html(this.template(this.model.toJSON()));
	}
	return this;
};


Backbone.View.prototype.close = function () {
    console.log('Closing view ' + this);
    if (this.beforeClose) {
        this.beforeClose();
    }
    this.remove();
    this.unbind();
};

var headerView;
var wineView;
var wineListView;

var wineList;

$(function() {
	
	wineList = new WineCollection();
	
	var AppRouter = Backbone.Router.extend({
		
	    initialize: function() {
	    	wineList.fetch({async: false});
	    	
	    	headerView = new HeaderView();
	    	wineView = new WineView();
	    	wineListView = new WineListView({model: wineList});
	    	
	    	$('#sidebar').html(wineListView.render().el);
	        $('#header').html(headerView.render().el);
	        $('#content').html(wineView.render().el);
	    },
	
		routes: {
			""			: "list",
			"wines/new"	: "newWine",
			"wines/:id"	: "wineDetails"
		},
	
		list: function() {
	  	},
	
		wineDetails: function(id) {
			wineView.setModel(wineList.get(id));
	  	},
	
		newWine: function() {
			wineView.setModel(new Wine());
		}
	
	});
	
	tpl.loadTemplates(['header', 'wine-details', 'wine-list-item'], function() {
	    app = new AppRouter();
	    Backbone.history.start();
	});
});