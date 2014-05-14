var PageLogin = PageView.extend({
	
	frag: '/pages/login.php',
	className: 'page page_login',

	initialize:function(main)
	{				
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
	},	

	onSubmit:function(e)
	{
		e.preventDefault();
		
		var username = this.$el.find('form #username').val();
		var password = this.$el.find('form #password').val();

		pararchive.user.set(
		{
			"username": username,
			"password": password,
		});

		pararchive.user.save({},{success:function()
		{	
			pararchive.router.navigate('',{trigger:true});					
		}});
	},

});