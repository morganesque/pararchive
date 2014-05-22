var PageView = Backbone.View.extend({

	showing:false,
	frag: '', // YOU NEED TO SET THIS IN CHILD VIEWS.

	initialize:function(){},

	/*
		just capture any <a> clicks and take them to the URL (via Backbone).
	*/			
	events: {
		"click a": 'onClick',
	},

	onClick:function(e)
	{		
		console.log("onClick");		
		e.preventDefault();
		// grab the href yo!
		var href = $(e.target).attr('href');
        // make it so number one!
        pararchive.router.navigate(href,{trigger:true});
	},

	build:function()
	{
		// console.log("PageView build");		
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
		// something.
	},
});