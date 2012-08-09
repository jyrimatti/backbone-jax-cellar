window.WineListView = Backbone.View.extend
	tagName:'ul'

	initialize: ->
		this.model.bind "reset", this.render, this
		self = this
		this.model.bind "add", (wine) ->
			$(self.el).append new WineListItemView({model:wine}).render().el

	render: (eventName) ->
		($(this.el).append new WineListItemView({model:wine}).render().el) for wine in this.model.models
		this
	
window.WineListItemView = Backbone.View.extend
	tagName:"li"
    
	directives:
		name:
			href: (params) -> params.value + this.id

	initialize: ->
		this.template = tpl.get 'wine-list-item'
		this.model.bind "change", this.render, this
		this.model.bind "destroy", this.close, this
