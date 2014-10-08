var StoryPanelView = Marionette.ItemView.extend(
{
	template:'#panel-template',	
	className:'story-panel',
	blockID:undefined,

	ui: {
		blocks:'.story-panel__blocks',
		name:'.story-panel__name .content',
		author:'.story-panel__name .author',

		plus:'.btn-new-block',
		viewstory:'.btn-view-story',
		editstory:'.btn-edit-story',
	},

	events:{
		'click .block__link': "onBlockClick",
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
		this.collection.sort();
		var out = {items:this.collection.toJSON()};
		if (this.collection.meta !== undefined) out.meta = this.collection.meta.toJSON();
		return out;
	},

	onRender:function()
	{		
		// console.log("StoryPanelView:onRender");		
		if (this.state == 'edit') this.ui.editstory.hide();

		this.sorter = new Sortable(this.ui.blocks[0],{
			draggable:  '.block',
			animation:  150,
			handle:     '.block',
			ghostClass: "block--dragged",
			onUpdate:_.bind(this.doneDraggging,this),
		});

		this.selectBlock();
	},

	doneDraggging:function(event)
	{
		$('.block__link').each(_.bind(function(a,b,c)
		{
			var id = $(b).attr('href').substr(1);
			var bk = this.collection.get(id);
			console.log(a,id);		
			bk.save({order:a},{success:function(a,b)
			{
				console.log(b.order);		
				console.log(a.get('id'),a.get('order'));		
			}});	
		},this));
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
		this.blockID = bid;
		this.selectBlock();
	},

	/*
		When choosing a block from the list just take them to the URL (silently)
	*/		
	onBlockClick:function(e)
	{
		console.log("onBlockClick");		
		e.preventDefault();		

		var sid = this.collection.storyID;
		var bid = $(e.currentTarget).attr('href').substr(1);

		pararchive.nav.editStoryBlock(sid,bid);
	},

	/*
		changing the appearance of the list to reflect the block being editted.
	*/		
	selectBlock:function()
	{
		if (this.blockID)
		{
			// console.log("selectBlock: "+this.blockID);		
			var block = this.$el.find('.block_'+this.blockID);
			this.$el.find('.block').removeClass('current'); // remove the current 
			block.addClass('current');	
		}
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