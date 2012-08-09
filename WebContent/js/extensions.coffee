window.Hidden = "hidden"

Backbone.View.prototype.setModel = (m) ->
	if this.model? and this.model != Hidden
		this.model.unbind "change", this.render, this

	this.model = m
	this.model.bind "change", this.render, this
	this.render()

Backbone.View.prototype.render = (eventName) ->
	unless this.model == Hidden
		$(this.el).html $(this.template).render( (if this.model? then this.model.toJSON() else {}), this.directives)
	this

Backbone.View.prototype.close = ->
	console.log 'Closing view ' + this
	this.beforeClose() if this.beforeClose
	this.remove()
	this.unbind()
