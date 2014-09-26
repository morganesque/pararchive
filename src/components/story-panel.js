var StoryPanelView = Marionette.ItemView.extend(
{
	template:'#panel-template',

	events:{
		'click .block': "onBlockClick",
		'click .view-story' : "onViewStory"
	},

	ui: {
		newblockbutton:'.plus',
		temp:'.story-panel__blocks .block',
		plus:'.story-panel__blocks .plus',
		blocks:'.story-panel__blocks',
		name:'.story-panel__name .content',
		author:'.story-panel__name .author',
	},

	behaviors:{
		NewBlock:{},
	},

	onRender:function()
	{		
		this.ui.temp.remove();
		this.ui.plus.remove();
		this.addBlocks();
		this.addTitle();
		this.addAuthor();		
	},

	/*
		this.model = pararchive.story 
	*/		
	initialize:function(options)
	{		
		this.listenTo(this.model, "block", 	this.blockBlocks);
		this.listenTo(this.model, "reset", 	this.resetBlocks);
		this.listenTo(this.model, "add", 	this.addBlocks);
		this.listenTo(this.model, "meta", 	this.addTitle);

		this.listenTo(pararchive.user, "change", this.addAuthor);		
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
		this.ui.blocks.empty();

		_.each(this.model.models,function(m,i)
		{
			var id = m.id;
			var sd = m.get('story_id');

			if(!id) id = m.cid; // it's a new Block	

			var n = this.ui.temp.clone();
			n.attr('href','/story/'+sd+'/block/'+id+'/');
			n.addClass('block_'+id);
			n.text(i+1);

			this.ui.blocks.append(n);					
		},this);

		this.ui.blocks.append(this.ui.plus);
	},

	/*
		Title comes from a different model so it listened for separately.
	*/		
	addTitle:function()
	{
		this.ui.name.text(this.model.meta.get('name'));
	},	

	addAuthor:function()
	{
		var fn = pararchive.user.get('firstname');
		var sn = pararchive.user.get('surname');	

		this.ui.author.text('by '+fn+' '+sn);
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