// console.log('init');		
// just to be safe.
if (typeof(pararchive) == "undefined") pararchive = {};

$(document).on("ready",function(e)
{
	pararchive = new App();

	pararchive.on("start", function(options)
	{
		pararchive.user.fetch({success:function(a,b,c)
		{						
			// console.log(pararchive.user);		
			switch(pararchive.user.get('status'))
			{
				case "logged out":
					Backbone.history.start({pushState:true,silent:true});	
					// if (Backbone.history.fragment != 'login/') pararchive.router.navigate('login/');					
					pararchive.controller.login();
				break;

				case "logged in":
					Backbone.history.start({pushState:true});
				break;
			}	
		}});
	});

	pararchive.start();	
});
