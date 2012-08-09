window.WineView = Backbone.View.extend
	# Not required since 'div' is the default if no el or tagName specified
	tagName: "div"
	
	initialize: ->
		this.template = tpl.get 'wine-details'
	    
	directives:
		picture:
			src: (params) -> params.value + this.picture;

	events:
		"change input"  : "change",
		"click .save"   : "saveWine",
		"click .delete" : "deleteWine"
	
	change: (event) ->
		target = event.target
		console.log 'changing ' + target.id + ' from: ' + target.defaultValue + ' to: ' + target.value
		# You could change your model on the spot, like this:
    # var change = {};
    # change[target.name] = target.value;
    # this.model.set(change);
	
	saveWine: ->
		this.model.set
			name:        $('#name').val()
			grapes:      $('#grapes').val()
			country:     $('#country').val()
			region:      $('#region').val()
			year:        $('#year').val()
			description: $('#description').val()
		
		if this.model.isNew()
			self = this
			wineList.create this.model, success: ->
				app.navigate 'wines/'+self.model.id, false ;
		else
			this.model.save()
	
		false
	
	deleteWine: ->
		this.model.destroy
			success: ->
				alert 'Wine deleted successfully'
				window.history.back()
		false
