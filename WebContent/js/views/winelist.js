$(function(){
	window.WineListView = Backbone.View.extend({
	
	    tagName:'ul',
	
	    initialize:function () {
	        this.model.bind("reset", this.render, this);
	        var self = this;
	        this.model.bind("add", function (wine) {
	            $(self.el).append(new WineListItemView({model:wine}).render().el);
	        });
	    },
	
	    render:function (eventName) {
	        _.each(this.model.models, function (wine) {
	            $(this.el).append(new WineListItemView({model:wine}).render().el);
	        }, this);
	        return this;
	    }
	});
	
	window.WineListItemView = Backbone.View.extend({
	
	    tagName:"li",
	    
	    directives: {
	    	name: {
	    		href: function(params) {
	    			return params.value + this.id;
	    		}
	    	}
	    },
	
	    initialize:function () {
	        this.template = tpl.get('wine-list-item');
	        this.model.bind("change", this.render, this);
	        this.model.bind("destroy", this.close, this);
	    }
	});
});