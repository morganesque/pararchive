var AllStoriesView = Marionette.ItemView.extend(
{
	template:"#allstories-template",
	className:'all-stories',

	templateHelpers:function()
	{
		return {
			isUser:function(id)
			{
				if (id == pararchive.user.id) return true;
				else return false;
			}
		};
	},

	behaviors: {
		ViewStory:{},
		EditStory:{},
	},

	ui:{
		viewstory:'.all-stories__view',
		editstory:'.all-stories__edit',
	},

	events:{

	},

	initialize:function()
	{		
		this.listenTo(this.collection, "reset", this.render);		

		this.listenTo(pararchive.story, "reset", this.render);		
		this.listenTo(pararchive.story, "change", this.render);
	},
});