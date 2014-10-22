var NavController = Marionette.Controller.extend({

	start:function()
	{
		// console.log("start");		
		this.listenTo(pararchive.user, 'change', this.onUser);
	},

	onUser:function()
	{	
		this.user = pararchive.user.get('username');
	},

	/*
		Actually controller functions start here. 
	*/		

	allStories:function()
	{
		pararchive.router.navigate('/');			
		pararchive.showAllStories();
        pararchive.allStories.fetch({reset:true,error:function(model,response,options)
		{
			if (response.status == 401) {
				alert('Very sorry but you have been logged out due to inactivity.');
				window.location.href = '/';
			}
		}});
	},

	yourStories:function()
	{
		// console.log("Nav\t\t\tyourStories");		
		pararchive.router.navigate('/'+this.user+'/');
        pararchive.user.stories.fetch({reset:true,error:function(model,response,options)
		{
			if (response.status == 401) {
				alert('Very sorry but you have been logged out due to inactivity.');
				window.location.href = '/';
			}
		}});
		pararchive.showYourStories();
	},

	editStory:function(sid)
	{
		// console.log("Nav\t\t\teditStory");		
		var url = pararchive.user.get('username');
		pararchive.router.navigate('/'+this.user+'/story/'+sid+'/edit/');
        pararchive.showEditStory();
		pararchive.story.setStoryID(sid);
		pararchive.story.loadStory();
	},

	editStoryBlock:function(sid,bid)
	{
		// console.log("Nav\t\t\teditStoryBlock");		
		pararchive.router.navigate('/'+this.user+'/story/'+sid+'/block/'+bid+'/edit/');
		pararchive.showEditBlock();		
		pararchive.story.setBlock(bid);	
	},

	savedBlock:function(sid,bid)
	{
		// console.log("Nav\t\t\tsavedBlock");		
		pararchive.router.navigate('/'+this.user+'/story/'+sid+'/block/'+bid+'/saved/');
        pararchive.showSavedBlock();
	},

	viewStory:function(slug)
	{
		// console.log("Nav\t\t\tviewStory");
		pararchive.router.navigate('/view/'+slug+'/',{trigger:true});	
	},

	viewStoryBlock:function(slug,bin)
	{
		// console.log("Nav\t\t\tviewStoryBlock");
		// change the URL.
		pararchive.router.navigate('/view/'+slug+'/'+bin+'/');
		// change the HTML.
		pararchive.showViewBlock();
		// update the data.
		pararchive.story.setBlockByIndex(bin);
	},
});