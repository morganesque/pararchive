/*

	1. initialize 	- router.js (1st time only)
	2. build 		- router.js (1st time only)
	3. setup		- build() after it's done (1st time only)
	4. update		- build() after it's run setup() (1st time only)
	4. render 		- router.js - calls update each time page is displayed (as long as setup has been done)
*/
var PageView = Backbone.View.extend({

	ready:false,
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
		// console.log("onClick");		
		e.preventDefault();
		// grab the href yo!
		var href = $(e.target).attr('href');
        // make it so number one!
        pararchive.router.navigate(href,{trigger:true});
	},

	build:function()
	{
		// console.log("PageView build");		
		this.$el.load(this.frag,_.bind(function()
		{
			this.setup();
			this.ready = true;
			this.update();
		},this));
	},

	render:function()
	{
		if (this.ready) this.update();
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