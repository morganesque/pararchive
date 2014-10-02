var StoryFrontView = Marionette.ItemView.extend(
{
	template:'#storyfront-template',

	ui: {
		start:'.view-story__start',
		storyname:'.view-story__name',
		blurb:'.view-story__blurb',
	},

	events: {
		'click @ui.start':'onStart'
	},

	behaviors:{

	},

	initialize:function()
	{
		this.listenTo(this.model, "meta", this.render);
	},

	onRender:function()
	{
		if (this.model.meta)
		{
			this.ui.storyname.text(this.model.meta.get('name'));	
		}
	},

	onStart:function(e)
	{
		e.preventDefault();
		var slug = pararchive.story.meta.get('slug');
		pararchive.nav.viewStoryBlock(slug,1);
	},
});
