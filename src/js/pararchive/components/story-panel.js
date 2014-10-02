var StoryPanelView = Marionette.ItemView.extend(
{
	template:'#panel-template',	

	ui: {
		temp:'.story-panel__blocks .block',		
		blocks:'.story-panel__blocks',
		name:'.story-panel__name .content',
		author:'.story-panel__name .author',

		plus:'.btn-new-block',
		view:'.btn-view-story',
		edit:'.btn-edit-story',
	},

	events:{
		'click .block': "onBlockClick",
		'click @ui.view' : "onViewStory",
		'click @ui.edit' : "onEditStory",
	},

	behaviors:{
		NewBlock:{},
	},

	/*
		this.model = pararchive.story 
	*/		
	initialize:function(options)
	{		
		this.listenTo(this.model, "block", 	this.blockBlocks);
		this.listenTo(this.model, "reset", 	this.resetBlocks);
		this.listenTo(this.model, "add", 	this.addBlocks);
	},

	onRender:function()
	{		
		// console.log("StoryPanelView:onRender");		
		this.ui.temp.remove();
		if (this.model.length)
		{
			this.addBlocks();
		}
	},

	blockBlocks:function()
	{
		// console.log("blockBlocks");		
		// throw new Error('blockBlocks');
		var bid = this.model.block.get('id');
		if (!bid) bid = this.model.block.cid;
		this.selectBlock(bid);
	},

	resetBlocks:function()
	{
		// console.log('–– resetBlocks');		
		this.addBlocks();
	},

	/*
		Main rendering of this component.
	*/		
	addBlocks:function()
	{		
		this.ui.blocks.empty();

		this.model.each(function(m,i)
		{
			var id = m.id;
			var sd = m.get('story_id');

			if(!id) id = m.cid; // it's a new Block	

			var n = this.ui.temp.clone();
			n.attr('href','#'+id);
			n.addClass('block_'+id);
			n.text(i+1);

			this.ui.blocks.append(n);					
		},this);
	},

	/*
		When choosing a block from the list just take them to the URL (silently)
	*/		
	onBlockClick:function(e)
	{
		// console.log("onBlockClick");		
		e.preventDefault();		

		var sid = this.model.storyID;
		var bid = $(e.currentTarget).attr('href').substr(1);

		pararchive.nav.editStoryBlock(sid,bid);
	},

	/*
		changing the appearance of the list to reflect the block being editted.
	*/		
	selectBlock:function(id)
	{
		var block = this.$el.find('.block_'+id);
		this.$el.find('.block').removeClass('current'); // remove the current 
		block.addClass('current');
	},

	deselectBlock:function()
	{
		this.$el.find('.block').removeClass('current'); // remove the current 
	},

	onViewStory:function(e)
	{
		e.preventDefault();
		var slug = pararchive.story.meta.get('slug');
		pararchive.nav.viewStory(slug);
	},

	onEditStory:function(e)
	{
		e.preventDefault();
		var sid = pararchive.story.meta.get('id');
		pararchive.nav.editStory(sid);
	},

	/*
		helper functions to allow this whole section to be controlled.
	*/		
	hide:function() {this.$el.hide();},
	show:function() {this.$el.show();},
});