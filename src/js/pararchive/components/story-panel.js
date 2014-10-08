var StoryPanelView = Marionette.ItemView.extend(
{
	template:'#panel-template',	
	className:'story-panel',
	blockID:undefined,

	templateHelpers:function()
	{
		return {
			getID:function(item)
			{
				
			},
		};
	},

	ui: {
		blocks:'.story-panel__blocks',

		plus:'.btn-new-block',
		viewstory:'.btn-view-story',
		editstory:'.btn-edit-story',

		name:'.story-name',
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

		this.listenTo(pararchive.vent, "storyname:change", this.changeName);
	},

	serializeData:function()
	{
		this.collection.sort();
		var bid;
		this.collection.each(function(e)
		{
			if (e.isNew()) e.set({cid:e.cid});
		});		
		var out = {items:this.collection.toJSON()};		
		if (this.collection.meta !== undefined) out.meta = this.collection.meta.toJSON();
		_.each(out.items,function(e)
		{

		});
		return out;
	},

	onRender:function()
	{		
		// if (this.collection.length) throw new Error('fish');
		// console.log(this.collection.pluck('order'));		

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

		if (this.collection.meta) this.ui.name.text(this.collection.meta.get('name')+' ');
	},

	doneDraggging:function(event)
	{
		$('.block__link').each(_.bind(function(a,b,c)
		{
			var id = $(b).attr('href').substr(1);
			var bk = this.collection.get(id);
			this.saveCount = 0;
			bk.save({order:a},{silent:true,success:_.bind(function(a,b)
			{
				this.saveCount++;
				if (this.saveCount == this.collection.length) this.render();
			},this)});	
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
		var bid = this.collection.block.get('id');		
		if (!bid) bid = this.collection.block.cid;
		this.blockID = bid;
		this.render();
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
	selectBlock:function()
	{
		// console.log("selectBlock: "+this.blockID);		
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

	changeName:function(name)
	{
		this.ui.name.text(name);
	},
});