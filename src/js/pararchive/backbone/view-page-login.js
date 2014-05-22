var PageLogin = PageView.extend({
	
	frag: '/pages/login.php',
	className: 'page page_login',

	initialize:function(){},

	events: {
		"click #login_submit": "onSubmit",
	},

	setup:function()
	{
		// console.log("PageLogin setup");		
		// when the frag is loaded this will be called.		
		// @ you should probably override this in a child view.
	},	

	onSubmit:function(e)
	{
		console.log("PageLogin onSubmit");		
		e.preventDefault();
		
		var username = this.$el.find('form #username').val();
		var password = this.$el.find('form #password').val();		

		pararchive.user.save({"username": username, "password": password},
		{
			success:function(m,r,o)
			{							
				pararchive.router.navigate('',{trigger:true});					
			}, 
			error:function(m,r,o)
			{
				console.log('error');			
				console.log([m,r,o]);		
			}
		});
	},

});