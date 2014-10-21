var EditController = Marionette.Controller.extend({

	login:function()
	{
		// console.log("Controller\tlogin");	
		pararchive.main.show(new LoginView);
	},

	home:function()
	{
		pararchive.showAllStories();
		pararchive.allStories.fetch({reset:true});
	},

	yourStories:function(username)
	{
		// console.log("Controller\tyourStories");		
		pararchive.showYourStories();
	},

	editStory:function(username,sid)
	{
		// console.log("Controller\teditStory\t"+sid);				
		pararchive.showEditStory();
		pararchive.story.setStoryID(sid);
		pararchive.story.loadStory();		
	},

	editBlock:function(username,sid,bid)
	{
		// console.log("Controller\teditBlock\t"+sid+" "+bid);		
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
				// console.log('no block!');		
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
	},

	savedBlock:function(sid,bid)
	{
		// console.log("Controller\tsavedBlock\t"+sid+" "+bid);		

		pararchive.story.setStoryID(sid);
		pararchive.story.setBlock(bid);			
		pararchive.showSavedBlock();
	},

	show404Error:function()
	{
		// console.log("Controller\tshow404Error");		
	},

	/*
        This just redirects the user to the main page again
        and is used because this allows a proper form submission
        on the login for which enables the browser to remember the 
        login details in it's default way.
    */        
    in:function()
    {
    	pararchive.nav.yourStories();
    },
});