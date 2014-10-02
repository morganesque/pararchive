var AllStoriesView = Marionette.ItemView.extend(
{
	template:"#allstories-template",
	className:'all-stories',

	behaviors: {
		
	},

	ui:{
		viewlink:'.all-stories__view',
	},

	events:{
		"click @ui.viewlink":"onViewClick",
	},

	initialize:function()
	{		
		this.listenTo(this.collection, "reset", this.render);		
	},

	onViewClick:function(e)
	{
		e.preventDefault();
		var slug = $(e.currentTarget).attr('href').substr(1);
		pararchive.nav.viewStory(slug);
	},
});