var EditController = Marionette.Controller.extend({

	login:function()
	{
		console.log("Controller: login");	
		pararchive.main.show(new LoginView);
	},

	home:function()
	{
		console.log("Controller: home");		
		var storiesview = new YourStoriesView({
			model:pararchive.stories,
		});
		pararchive.main.show(storiesview);
	},

	editStory:function(sid)
	{
		console.log("Controller: editStory: "+sid);				
		
		var storyview = new StoryListView({
			model:pararchive.story,
		});
		pararchive.main.show(storyview);

		pararchive.story.setStoryID(sid);
		pararchive.story.loadStory();

		pararchive.showStoryPanel();		
	},

	editBlock:function(sid,bid)
	{
		console.log("Controller: editBlock: "+sid+" "+bid);		

		/*
			If there's a storyID set they we've not arriving for the first time.
		*/		
		var story = pararchive.story.storyID; 
		if (story)
		{
			if (pararchive.story.get(bid))
			{				
				pararchive.showEditBlock();					
				pararchive.story.setBlock(bid);	
			} else {
				console.log('no block!');		
			}
		} else {
			pararchive.story.setStoryID(sid);
			pararchive.story.loadStory(_.bind(function()
			{
				if (pararchive.story.get(bid))
				{					
					pararchive.showEditBlock();
					pararchive.story.setBlock(bid);
				} else {
					pararchive.showEditBlock();
					pararchive.story.addBlock();
				}
			},this));
		}	

		pararchive.showStoryPanel();	
	},

	savedBlock:function(sid,bid)
	{
		console.log("Controller: savedBlock: "+sid+" "+bid);		

		pararchive.story.setStoryID(sid);
		pararchive.story.setBlock(bid);			
		pararchive.showSavedBlock();
	},

	show404Error:function()
	{
		console.log("Controller: show404Error");		
	},

	/*
        This just redirects the user to the main page again
        and is used because this allows a proper form submission
        on the login for which enables the browser to remember the 
        login details in it's default way.
    */        
    in:function()
    {
    	console.log("Controller: in");		
        window.location.href = '/';
    },
});