// console.log('init');		
// just to be safe.
if (typeof(pararchive) == "undefined") pararchive = {};

/*
	First thing is to create a User model and 
	fetch some data. If I get some we're in, if 
	not show the login screen.
*/		
$(document).on("ready",function(e)
{		
	pararchive = new App({el:$('#inner-wrap')});

	pararchive.user.getData(function(a,b,c)
	{						
		switch(pararchive.user.get('status'))
		{
			case "logged out":

				Backbone.history.start({pushState:true,silent:true});	
				if (Backbone.history.fragment != 'login/') // only do this if the frag isn't already "login/"
				{					
					pararchive.router.navigate('login/',{trigger:true});					
				} else {		
					pararchive.router.execute(pararchive.router.login);
				}

			break;

			case "logged in":

				var story = pararchive.user.get('latest_story'); 
				pararchive.story.startEditting(story,function()
				{
					Backbone.history.start({pushState:true});
				});

			break;
		}	
	});
});