var LoginView = Marionette.ItemView.extend(
{	
	template:'#login-template',
	initialize:function(){},

	events: {
		"click #login_submit": "onSubmit",
		// "submit #login-form": "onSubmit",
		"click a": 'onClick',
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
				var s = pararchive.user.get('status');		
				if (s == 'logged in')
				{
					$('#login-form').submit();
				} else {
					alert(s);
				}	
			}, 
			error:function(m,r,o)
			{
				console.log('error');			
				console.log([m,r,o]);		
			}
		});
	},

});