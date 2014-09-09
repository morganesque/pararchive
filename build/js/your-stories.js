var YourStoriesPage = PageView.extend({
	
	frag: '/pages/your-stories.php',
	className: 'page page_home',
	firsttime: true,

	events:{
		"click #start__button": "onStartClick",
		"click .story-list__edit-link": "onEditClick",
	},

	initialize:function()
	{		

	},

	setup:function()
	{
		// console.log("PageHome setup");		
		this.listenTo(pararchive.stories, "change", this.showList)		

		this.firsttime = false; // only stop asking to change events after this setup has happened.
	},

	showList:function()
	{
		var container = this.$el.find('.story-list');
		var stories = pararchive.stories.get('stories'); 

		_.each(stories,function(a)
		{				
			var link = $('<div class="story-list__item"><h3>'+a.name+'</h3><a href="#'+a.id+'" class="story-list__edit-link pull-right">edit this story</a></div>');
			container.append(link);
		},this);
	},

	update:function()
	{
		console.log("PageHome update");		
		pararchive.stories.getData();
	},

	onStartClick:function(e)
	{
		e.preventDefault();
		console.log('new!');			
	},

	onEditClick:function(e)
	{
		e.preventDefault();
		var story = $(e.currentTarget).attr('href').substr(1);		
		// pararchive.story.setStoryID(story);
		// pararchive.story.startEditting(function()
		// {
		// 	pararchive.router.navigate('/story/'+story,{trigger:true});
		// });
		pararchive.router.navigate('/story/'+story+'/',{trigger:true});
	},

});