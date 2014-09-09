var StoryListPage = PageView.extend({
	
	frag: '/pages/story-list.php',
	className: 'page story-list',

	events:{
		"click .new-block": 'onNewBlock',
	},

	setup:function()
	{
		// alert('wee!');
		this.num = this.$el.find('.some-blocks .num');
		this.someblocks = this.$el.find('.some-blocks');
		this.noblocks = this.$el.find('.no-blocks');
	},

	update:function()
	{
		if (pararchive.story.length)
		{
			this.someblocks.show();
			this.noblocks.hide();

			if (pararchive.story.length == 1) this.num.text('1 block');
			else this.num.text(pararchive.story.length+' blocks');

		} else {
			this.someblocks.hide();
			this.noblocks.show();
		}

		/*
			Hack!
			Just have to force it not to select a block on this page.
		*/		
		pararchive.storyPanel.deselectBlock();
	},

	onNewBlock:function(e)
	{
		e.preventDefault();
		pararchive.story.addBlock();
		var sid = pararchive.story.storyID;
		var bid = pararchive.story.blockID;
		pararchive.router.navigate('/story/'+sid+'/block/'+bid+'/',{trigger:true});
	},

});