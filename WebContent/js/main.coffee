
AppRouter = Backbone.Router.extend
	initialize: ->
		window.wineList = new WineCollection
		wineList.fetch
			async: false
			
		window.headerView = new HeaderView
		window.wineView = new WineView
			model: Hidden
		window.wineListView = new WineListView
			model: wineList
    	
		$('#sidebar').html wineListView.render().el
		$('#header').html headerView.render().el
		$('#content').html wineView.render().el
	
	routes:
		""			    : "list"
		"wines/new"	: "newWine"
		"wines/:id"	: "wineDetails"

	list: ->

	wineDetails: (id) ->
		wineView.setModel wineList.get(id)

	newWine: ->
		wineView.setModel new Wine()

tpl.loadTemplates ['header', 'wine-details', 'wine-list-item'], ->
	window.app = new AppRouter()
	Backbone.history.start()
