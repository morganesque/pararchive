var StoryPanelView = Backbone.View.extend(
{
	events:{
		'click .block': "onBlockClick",
		'click .plus' : "onPlusClick",
		'click .view-story' : "onViewStory"
	},

	/*
		this.model = pararchive.story 
	*/		
	initialize:function(options)
	{		
		this.user = options.user;
		
		this.listenTo(this.model, "block", this.blockBlocks);
		this.listenTo(this.model, "reset", this.resetBlocks);
		this.listenTo(this.model, "add", this.addBlocks);

		this.listenTo(this.model, "meta", this.addTitle);

		this.listenTo(this.user, "change", this.addAuthor);

		this.template 	= this.$el.find('.story-panel__blocks .block').remove();
		this.plus 		= this.$el.find('.story-panel__blocks .plus').remove();
		this.blocks 	= this.$el.find('.story-panel__blocks'); 
		this.name 		= this.$el.find('.story-panel__name .content');
		this.author 	= this.$el.find('.story-panel__name .author');
	},

	blockBlocks:function()
	{
		// throw new Error('blockBlocks');
		console.log('blockBlocks');		
	},

	resetBlocks:function()
	{
		console.log('resetBlocks');		
		this.addBlocks();
	},

	/*
		Main rendering of this component.
	*/		
	addBlocks:function()
	{		
		console.log("addBlocks");		
		this.blocks.empty();

		_.each(this.model.models,function(m,i)
		{
			var id = m.id;
			var sd = m.get('story_id');

			if(!id) id = m.cid; // it's a new Block	

			var n = this.template.clone();
			n.attr('href','/story/'+sd+'/block/'+id+'/');
			n.addClass('block_'+id);
			n.text(i+1);

			this.blocks.append(n);					
		},this);

		this.blocks.append(this.plus);
	},

	/*
		Title comes from a different model so it listened for separately.
	*/		
	addTitle:function()
	{
		this.name.text(this.model.meta.get('name'));
	},	

	addAuthor:function()
	{
		var fn = this.user.get('firstname');
		var sn = this.user.get('surname');	

		this.author.text('by '+fn+' '+sn);
	},

	/*
		When choosing a block from the list just take them to the URL (silently)
	*/		
	onBlockClick:function(e)
	{
		console.log("onBlockClick");		
		e.preventDefault();		
		var href = $(e.currentTarget).attr('href');
		pararchive.router.navigate(href,{trigger:true});
	},

	/*
		When adding a new block to the story.
	*/		
	onPlusClick:function(e)
	{
		e.preventDefault();		
		this.model.addBlock();	
		pararchive.router.navigate('/story/'+this.model.storyID+'/block/'+this.model.blockID+'/',{trigger:true});
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
		pararchive.router.navigate('/view/story/'+pararchive.story.storyID+'/',{trigger:true});
	},

	/*
		helper functions to allow this whole section to be controlled.
	*/		
	hide:function() {this.$el.hide();},
	show:function() {this.$el.show();},
});