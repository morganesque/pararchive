var SavedBlockView = Marionette.ItemView.extend(
{
	template:'#savedblock-template',
	// frag: '/pages/saved-block.php',
	// className: 'page saved-block',

	events: {
		'click .view-it': 'onViewClick',
	},

	ui: {
		newblockbutton:'.new-block',
		editblock:'.edit-it',
	},

	behaviors:{
		NewBlock:{},
		EditBlock:{},
	},

	onViewClick:function(e)
	{
		e.preventDefault();
		var sid = pararchive.story.storyID;
		pararchive.router.navigate('/story/'+sid+'/read/',{trigger:true});
	},
});