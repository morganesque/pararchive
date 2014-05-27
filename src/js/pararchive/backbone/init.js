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

	// first create a User object.
    pararchive.user = new Model();
    pararchive.user.urlRoot = '/api/users/';		

    // set the initial state.
    pararchive.state = new Backbone.Model({state:'login'});

    // set up the stories model.
    pararchive.stories = new Stories();

	// start a story.
	pararchive.story = new Story();

	// attach story to story panel.
	pararchive.storyPanel = new StoryPanel({
		model:pararchive.story,
		el:$('#storyPanel')
	});	

	var App = Backbone.View.extend(
	{        
	    initialize: function(options) 
	    {
	        this.listenTo(pararchive.state, "change:state", this.changeState)

	        this.controlPanel = this.$el.find('#control');
	        this.controlPanel.hide();

	        this.storyPanel = this.$el.find('#storyPanel');
	        this.storyPanel.hide();
	    },  
	    
	    changeState:function(e)
	    {	    		
	    	switch(pararchive.state.get('state'))
	    	{
	    		case "login":
	    			this.controlPanel.hide();
	    			this.storyPanel.hide();
	    		break;

	    		case "editing":
	    			this.controlPanel.show();
	    			this.storyPanel.show();
	    		break;
	    	}
	    }
	});

	pararchive.app = new App({el:$('#inner-wrap')});

	// wait for a block to be added to a story.
	pararchive.story.on('reset',function()
	{
		pararchive.control = new Control(
		{
			model:pararchive.story.getStoryBlock(),
			el:$('#control'),
		});				
	});	

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

				pararchive.story.setStoryID(story);
				pararchive.story.fetch({reset:true,success:function()
				{
					Backbone.history.start({pushState:true});
				}});			

			break;
		}	
	});
});