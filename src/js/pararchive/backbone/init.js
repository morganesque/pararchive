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
	// set up the Backbone router // router.js
	pararchive.router = new Router;

	// first create a User object
    pararchive.user = new Model();
    // pararchive.user.urlRoot = 'http://api.staging.pararchivedfutures.com/me';
    pararchive.user.urlRoot = '/api/user/';		

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
	
				Backbone.history.start({pushState:true});

			break;
		}	
	});

	pararchive.state = 'create:block';

	var StoryBlock = Backbone.Model.extend({});
	pararchive.storyBlock = new StoryBlock();

	pararchive.control = new Control(
	{
		model:pararchive.storyBlock,
		el:$('#control'),
	});

	// pararchive.story = Backbone.Collection.extend(
	// {
	// 	model:pararchive.storyBlock,
	// });
});