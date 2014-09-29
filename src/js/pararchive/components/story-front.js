var StoryFrontView = Marionette.ItemView.extend(
{
	template:'#storyfront-template',

	ui: {
		start:'.story-front__start'
	},

	events: {
		'click @ui.start':'onStart'	
	},

	behaviors:{

	},

	onStart:function(e)
	{
		e.preventDefault();
		var block = pararchive.story.getBlock();
		var slug = pararchive.story.meta.get('slug');
		var bid = block.get('id');

		pararchive.viewrouter.navigate('/view/'+slug+'/'+bid+'/');
		pararchive.story.setBlock(bid);
		pararcive.showViewBlock();
	},
});