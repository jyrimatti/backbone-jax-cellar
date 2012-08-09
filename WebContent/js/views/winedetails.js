$(function(){
	window.WineView = Backbone.View.extend({
	
	    tagName: "div", // Not required since 'div' is the default if no el or tagName specified
	
	    initialize: function() {
	        this.template = tpl.get('wine-details');
	    },
	    
	    directives: {
	    	picture: {
	    		src: function(params) {
	    			return params.value + this.picture;
	    		}
	    	}
	    },
	
	    events: {
	        "change input": "change",
			"click .save": "saveWine",
			"click .delete": "deleteWine"
	    },
	
	    change: function(event) {
	        var target = event.target;
	        console.log('changing ' + target.id + ' from: ' + target.defaultValue + ' to: ' + target.value);
			// You could change your model on the spot, like this:
	        // var change = {};
	        // change[target.name] = target.value;
	        // this.model.set(change);
	    },
	
		saveWine: function() {
			this.model.set({
				name: $('#name').val(),
				grapes: $('#grapes').val(),
				country: $('#country').val(),
				region: $('#region').val(),
				year: $('#year').val(),
				description: $('#description').val()
			});
			if (this.model.isNew()) {
				var self = this;
				wineList.create(this.model, {
					success: function() {
						app.navigate('wines/'+self.model.id, false);
					}
				});
			} else {
				this.model.save();
			}
	
			return false;
		},
	
		deleteWine: function() {
			this.model.destroy({
				success: function() {
					alert('Wine deleted successfully');
					window.history.back();
				}
			});
			return false;
		}
	});
});