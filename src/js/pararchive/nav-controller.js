var NavController = Marionette.Controller.extend({

	initialize:function(options)
	{
		this.listenTo(options.user, 'change', this.onUser);
	},

	onUser:function()
	{	
		this.user = pararchive.user.get('username');
	},

	yourStories:function()
	{
		console.log("Nav\t\t\tyourStories");		
		pararchive.router.navigate('/'+this.user+'/');
		pararchive.showYourStories();
	},

	editStory:function(sid)
	{
		console.log("Nav\t\t\teditStory");		
		var url = pararchive.user.get('username');
		pararchive.router.navigate('/'+this.user+'/story/'+sid+'/edit/');
        pararchive.showEditStory();
		pararchive.story.setStoryID(sid);
		pararchive.story.loadStory();
	},

	editStoryBlock:function(sid,bid)
	{
		console.log("Nav\t\t\teditStoryBlock");		
		pararchive.router.navigate('/'+this.user+'/story/'+sid+'/block/'+bid+'/edit/');
		pararchive.showEditBlock();		
		pararchive.story.setBlock(bid);	
	},

	savedBlock:function(sid,bid)
	{
		console.log("Nav\t\t\tsavedBlock");		
		pararchive.router.navigate('/'+this.user+'/story/'+sid+'/block/'+bid+'/saved/');
        pararchive.showSavedBlock();
	},

	viewStory:function(slug)
	{
		console.log("Nav\t\t\tviewStory");
		pararchive.router.navigate('/view/'+slug+'/',{trigger:true});	
	},

	viewStoryBlock:function(slug,bin)
	{
		console.log("Nav\t\t\tviewStoryBlock");
		// change the URL.
		pararchive.router.navigate('/view/'+slug+'/'+bin+'/');
		// change the HTML.
		pararchive.showViewBlock();
		// update the data.
		pararchive.story.setBlockByIndex(bin);
	},
});