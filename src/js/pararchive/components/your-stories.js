var YourStoriesView = Marionette.ItemView.extend(
{
	template:"#stories-template",

	behaviors: {
		EditStory:{},
		ViewStory:{},
	},

	ui:{
		storylist:'.edit-story',
		author:'.author-name',
		editstory:'.edit-story__edit',
		viewstory:'.edit-story__view',
	},

	events:{
		'click .create-new-story': "onCreateNewStory",
	},

	initialize:function()
	{		
		this.listenTo(this.collection, "reset", this.render);		
		this.listenTo(this.collection, "change", this.render);		

		this.listenTo(pararchive.user, "reset", this.render);			
	},

	onRender:function()
	{
		// console.log("YourStoriesView\t onRender");		
		this.showAuthor();
	},

	showAuthor:function()
	{
		// console.log("showAuthor");		
		this.ui.author.text(pararchive.user.get('firstname'));
	},

	onCreateNewStory:function(e)
	{
		e.preventDefault();	

		pararchive.story.reset();
		pararchive.story.meta.clear();
		
		var m = pararchive.user.stories.add({
			name:"My Story",
			user_id:pararchive.user.get('id'),
		});

		pararchive.nav.editStory(m.cid);
	},
});