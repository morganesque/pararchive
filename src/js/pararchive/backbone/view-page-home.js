var PageHome = PageView.extend({
	
	frag: '/pages/home.php',
	className: 'page page_home',

	initialize:function(main)
	{		
		console.log(this.el);		
		this.main = main;	// DOM element where content will be placed.
	},

	events: {
		"click #login_submit": "onSubmit",
	},

	setup:function()
	{
		console.log("PageLogin setup");		
		// when the frag is loaded this will be called.		
		// @ you should probably override this in a child view.
	}

});