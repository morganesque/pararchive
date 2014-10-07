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
		
	},

	ui:{
		viewlink:'.all-stories__view',
		editlink:'.all-stories__edit',
	},

	events:{
		"click @ui.viewlink":"onViewClick",
		"click @ui.editlink":"onEditStory",
	},

	initialize:function()
	{		
		this.listenTo(this.collection, "reset", this.render);		
	},

	onViewClick:function(e)
	{
		e.preventDefault();
		var slug = $(e.currentTarget).attr('href').split('/')[2];
		pararchive.nav.viewStory(slug);
	},

	onEditStory:function(e)
	{
		e.preventDefault();
		var sid = $(e.currentTarget).attr('href').split('/')[3];
		pararchive.nav.editStory(sid);
	},
});