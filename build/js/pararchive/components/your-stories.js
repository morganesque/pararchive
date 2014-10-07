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
		var m = this.collection.add({
			name:'MyStory',
			user_id:pararchive.user.get('id'),			
		});
		m.save({},{success:function(story,b,c)
		{
			var sid = story.get('id');
			pararchive.nav.editStory(sid);
		}});
	},
});