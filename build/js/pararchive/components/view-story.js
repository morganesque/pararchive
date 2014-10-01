var StoryFrontView = Marionette.ItemView.extend(
{
	template:'#storyfront-template',

	ui: {
		start:'.view-story__start'
	},

	events: {
		'click @ui.start':'onStart'
	},

	behaviors:{

	},

	onStart:function(e)
	{
		e.preventDefault();
		// var block = pararchive.story.getBlock();
		var slug = pararchive.story.meta.get('slug');
		// var bid = block.get('id');

		// pararchive.viewrouter.navigate('/view/'+slug+'/'+bid+'/');
		pararchive.viewrouter.navigate('/view/'+slug+'/1/');
		pararchive.showViewBlock();
		pararchive.story.setBlock();
	},
});
