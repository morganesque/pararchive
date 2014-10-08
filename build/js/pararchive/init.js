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
			switch(pararchive.user.get('status'))
			{
				case "logged out":
					Backbone.history.start({pushState:true,silent:true});	
					pararchive.controller.login();
				break;

				case "logged in":
					pararchive.showHeader();
					Backbone.history.start({pushState:true});
				break;
			}	
		}});

		pararchive.nav.start();		
	});

	pararchive.start();	
});
