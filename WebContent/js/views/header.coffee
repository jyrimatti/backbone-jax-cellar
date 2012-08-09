window.HeaderView = Backbone.View.extend
	initialize: ->
		this.template = tpl.get 'header'

	events: ->
		"click .new" : "newWine"

	newWine: (event) ->
		app.navigate "wines/new", true
		false
