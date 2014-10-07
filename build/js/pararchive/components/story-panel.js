var StoryPanelView = Marionette.ItemView.extend(
{
	template:'#panel-template',	
	className:'story-panel',

	ui: {
		blocks:'.story-panel__blocks',
		name:'.story-panel__name .content',
		author:'.story-panel__name .author',

		plus:'.btn-new-block',
		viewstory:'.btn-view-story',
		editstory:'.btn-edit-story',
	},

	events:{
		'click .block': "onBlockClick",
	},

	behaviors:{
		NewBlock:{},
		ViewStory:{},
		EditStory:{},
	},

	/*
		this.collection = pararchive.story 
	*/		
	initialize:function(options)
	{		
		this.listenTo(this.collection, "block", 	this.blockBlocks);
		this.listenTo(this.collection, "reset", 	this.render);
		this.listenTo(this.collection, "change", 	this.render);
		this.listenTo(this.collection, "add", 		this.render);
	},

	serializeData:function()
	{
		var out = {items:this.collection.toJSON()};
		if (this.collection.meta !== undefined) out.meta = this.collection.meta.toJSON();
		return out;
	},

	onRender:function()
	{		
		// console.log("StoryPanelView:onRender");		
		if (this.state == 'edit') this.ui.editstory.hide();
	},

	setState:function(state)
	{
		// console.log("setState "+state);		
		this.state = state;
		if (state == 'edit') this.ui.editstory.hide();
	},

	blockBlocks:function()
	{
		// console.log("blockBlocks");				
		var bid = this.collection.block.get('id');
		if (!bid) bid = this.collection.block.cid;
		this.selectBlock(bid);
	},

	/*
		When choosing a block from the list just take them to the URL (silently)
	*/		
	onBlockClick:function(e)
	{
		// console.log("onBlockClick");		
		e.preventDefault();		

		var sid = this.collection.storyID;
		var bid = $(e.currentTarget).attr('href').substr(1);

		pararchive.nav.editStoryBlock(sid,bid);
	},

	/*
		changing the appearance of the list to reflect the block being editted.
	*/		
	selectBlock:function(id)
	{
		// console.log("selectBlock: "+id);		
		var block = this.$el.find('.block_'+id);
		this.$el.find('.block').removeClass('current'); // remove the current 
		block.addClass('current');
	},

	deselectBlock:function()
	{
		this.$el.find('.block').removeClass('current'); // remove the current 
	},

	/*
		helper functions to allow this whole section to be controlled.
	*/		
	hide:function() {this.$el.hide();},
	show:function() {this.$el.show();},
});