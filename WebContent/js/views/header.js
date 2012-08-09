$(function(){
	window.HeaderView = Backbone.View.extend({
	
	    initialize: function() {
	        this.template = tpl.get('header');
	    },
	
	    events: {
			"click .new"    : "newWine"
	    },
	
		newWine: function(event) {
			app.navigate("wines/new", true);
			return false;
		}
	
	});
});