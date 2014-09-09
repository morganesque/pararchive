var SavedBlockPage = PageView.extend({

	frag: '/pages/saved-block.php',
	className: 'page saved-block',

	events: {
		'click .edit-it': 'onEditClick',
		'click .view-it': 'onViewClick',
		'click .new-block': 'onNewClick',
	},

	initialize:function()
	{			
		// console.log("initialize");							
	},

	setup:function()
	{
		// console.log("SavedBlockPage setup");	

		this.editbtn = this.$el.find('.edit-it');
		this.viewbtn = this.$el.find('.view-it');
		this.newbtn = this.$el.find('.new-block');

		// this.listenTo(pararchive.story, "change", this.update);
	},

	update:function()
	{

	},

	onEditClick:function(e)
	{
		e.preventDefault();
		var sid = pararchive.story.storyID;
		var bid = pararchive.story.blockID;
		// console.log(sid,bid);		
		pararchive.router.navigate('/story/'+sid+'/block/'+bid+'/',{trigger:true});
	},

	onViewClick:function(e)
	{
		e.preventDefault();
		var sid = pararchive.story.storyID;
		pararchive.router.navigate('/story/'+sid+'/read/',{trigger:true});
	},

	onNewClick:function(e)
	{
		e.preventDefault();
		pararchive.story.addBlock();
		var sid = pararchive.story.storyID;
		var bid = pararchive.story.blockID;
		pararchive.router.navigate('/story/'+sid+'/block/'+bid+'/',{trigger:true});
	},
});