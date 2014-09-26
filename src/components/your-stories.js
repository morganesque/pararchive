var YourStoriesView = Marionette.ItemView.extend(
{
	template:"#stories-template",

	behaviors: {
		EditStory:{message:'boo!'},
	},

	initialize:function()
	{		
		this.listenTo(this.model, "change", this.showList);
		this.model.getData();
	},

	showList:function()
	{
		var container = this.$el.find('.story-list');
		var stories = this.model.get('stories'); 

		_.each(stories,function(a)
		{				
			var link = $('<div class="story-list__item"><h3>'+a.name+'</h3><a href="#'+a.id+'" class="story-list__edit-link pull-right">edit this story</a></div>');
			container.append(link);
		},this);
	},
});