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
		/*
			need to listen to meta & reset to make sure all the data is included.
		*/		
		this.listenTo(pararchive.story, "meta", this.render);
		this.listenTo(pararchive.story, "reset", this.render);
	},

	serializeData:function()
	{
		var out = this.model.toJSON();
		if (!out.blurb) out.blurb = '';
		out.blocks = pararchive.story.length;
		return out;
	},

	onRender:function()
	{},

	onStart:function(e)
	{
		e.preventDefault();
		var slug = this.model.get('slug');
		pararchive.nav.viewStoryBlock(slug,1);
	},
});
