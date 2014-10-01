var YourStoriesView = Marionette.ItemView.extend(
{
	template:"#stories-template",

	behaviors: {
		EditStory:{},
	},

	ui:{
		storylist:'.edit-story',
		author:'.author-name',
	},

	events:{
		'click .create-new-story': "onCreateNewStory",
	},

	initialize:function()
	{		
		this.listenTo(this.model, "reset", this.showList);		
		this.listenTo(this.model, "change", this.showList);		
		this.listenTo(pararchive.user, "reset", this.showAuthor);		
	},

	showList:function()
	{
		this.ui.storylist.empty();
		// this.model is the 
		this.model.each(function(a)
		{				
			var link = $('<div class="edit-story__item"><a href="#'+a.get('id')+'" class="edit-story__edit-link pull-right">edit this story</a><h3>'+a.get('name')+'</h3></div>');
			this.ui.storylist.append(link);
		},this);

		this.showAuthor();
	},

	showAuthor:function()
	{
		console.log("showAuthor");		
		this.ui.author.text(pararchive.user.get('firstname'));
	},

	onCreateNewStory:function(e)
	{
		e.preventDefault();
		var m = this.model.add({
			name:'MyStory',
			user_id:pararchive.user.get('id'),			
		});
		m.save({},{success:function(story,b,c)
		{
			var id = story.get('id');
			pararchive.router.navigate('/edit/story/'+id+'/');
        	pararchive.controller.editStory(id);
		}});
	},
});