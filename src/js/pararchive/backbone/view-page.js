var PageView = Backbone.View.extend({

	showing:false,
	frag: '', // YOU NEED TO SET THIS IN CHILD VIEWS.

	initialize:function(main)
	{
		this.main = main;	// DOM element where content will be placed.
	},

	build:function()
	{
		console.log("PageView build");		
		this.showing = true;				
		this.$el.load(this.frag,_.bind(this.setup,this));
	},

	update:function()
	{
		// when the router wants to display the page this will be called.
		
		// @ you should probably override this in a child view.
	},	

	setup:function()
	{
		// when the frag is loaded this will be called.
		
		// @ you should probably override this in a child view.
	},

	hide:function()
	{
		this.showing = false;
	},
});