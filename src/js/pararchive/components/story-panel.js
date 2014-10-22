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
		viewblock:'.btn-view-block',
		editstory:'.btn-edit-story',

		blockeditbuttons:'.block-edit-buttons',
		storyeditbuttons:'.story-edit-buttons',

		name:'.story-name',
	},

	events:{
		'click .block__link': "onBlockClick",
		'mouseover .block': "onBlockOver",
		'mouseout  .block': "onBlockOut",
	},

	behaviors:{
		NewBlock:{},
		ViewStory:{},
		ViewBlock:{},
		EditStory:{},
	},

	/*
		this.collection = pararchive.story 
	*/		
	initialize:function(options)
	{		
		// this.ran = Math.round(Math.random()*100);
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

		// console.log("StoryPanelView:onRender: "+this.state);		
		this.setState(this.state);

		this.sorter = new Sortable(this.ui.blocks[0],{
			draggable:  '.block',
			animation:  150,
			handle:     '.block',
			ghostClass: "block--dragged",
			onUpdate:_.bind(this.doneDragging,this),
			onStart: _.bind(this.onBlockDrag,this),
		});

		this.selectBlock();

		if (this.collection.meta) this.ui.name.text(this.collection.meta.get('name')+' ');
	},

	doneDragging:function(event)
	{
		$('.block__link').each(_.bind(function(a,b,c)
		{
			var id = $(b).attr('href').substr(1);
			var bk = this.collection.get(id);

			if(!bk.isNew()) 
			{
				// console.log('set: '+a);		
				this.saveCount = 0;
				bk.set({order:a},{silent:true});
				bk.save({},{silent:true,success:_.bind(function(a,b)
				{
					this.saveCount++;
					if (this.saveCount == this.collection.length) this.render();
					
				},this)});	
			} else {
				// console.log(a);		
				bk.set({order:a});
				this.saveCount++;
				if (this.saveCount == this.collection.length) this.render();
			}			
		},this));
		this.collection.sort();
		// console.log(this.collection.pluck("order"));

	},

	setState:function(state)
	{	
		if (typeof state !== "undefined") this.state = state;

		if (this.state == 'edit') 
		{
			this.ui.blockeditbuttons.hide();
			this.ui.storyeditbuttons.show();

			if (this.collection.length == 0) 
			{
				this.ui.viewstory.hide();
				this.ui.plus.hide();
			}
		}

		if (this.state == 'block') 
		{
			this.ui.blockeditbuttons.show();
			this.ui.storyeditbuttons.hide();
		}
	},

	blockBlocks:function()
	{			
		// console.log(this.collection.block);				
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

	onBlockOver:function(e)
	{
		e.preventDefault();
		if (!$(e.currentTarget).hasClass('current')) $(e.currentTarget).addClass('hover');
	},

	onBlockOut:function(e)
	{
		e.preventDefault();
		$(e.currentTarget).removeClass('hover');		
	},

	onBlockDrag:function(e)
	{
		e.preventDefault();
		$(e.currentTarget).find('.block').removeClass('hover');		
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