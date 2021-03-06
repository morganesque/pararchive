var SavedBlockView = Marionette.ItemView.extend(
{
	template:'#savedblock-template',
	// frag: '/pages/saved-block.php',
	// className: 'page saved-block',

	events: {
		'click .view-it': 'onViewClick',
	},

	ui: {
		plus:'.new-block',
		editblock:'.edit-it',
	},

	behaviors:{
		NewBlock:{},
		EditBlock:{},
	},

	onViewClick:function(e)
	{
		e.preventDefault();
		var slug = pararchive.story.get('slug');
		pararchive.viewStory(slug);		
	},
});