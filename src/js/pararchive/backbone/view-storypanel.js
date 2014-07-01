var StoryPanel = Backbone.View.extend(
{
	events:{
		'click .block': "onBlockClick",
		'click .plus' : "onPlusClick",
		'click .view-story' : "onViewStory"
	},

	/*
		this.model = pararchive.story 
	*/		
	initialize:function()
	{		
		this.user = pararchive.user;
		
		this.listenTo(this.model, "reset", this.addBlocks);
		this.listenTo(this.model, "add", this.addBlocks);
		this.listenTo(this.model, "meta", this.addTitle);

		this.template 	= this.$el.find('.story__blocks .block').remove();
		this.plus 		= this.$el.find('.story__blocks .plus').remove();
		this.blocks 	= this.$el.find('.story__blocks'); 
		this.name 		= this.$el.find('.story__name .content');
	},

	/*
		Main rendering of this component.
	*/		
	addBlocks:function()
	{
		this.blocks.empty();


		_.each(this.model.models,function(m,i)
		{
			var id = m.id;
			if(!id) id = m.cid; // it's a new Block	

			var n = this.template.clone();
			n.attr('href','#'+id);
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

	/*
		When choosing a block from the list.
	*/		
	onBlockClick:function(e)
	{
		e.preventDefault();

		this.$el.find('.block').removeClass('current');

		var id = $(e.currentTarget).attr('href').substr(1);
				
		this.model.setBlock(id);		
		pararchive.router.navigate('/what/',{trigger:true});
	},

	/*
		When adding a new block to the story.
	*/		
	onPlusClick:function(e)
	{
		e.preventDefault();		
		this.model.addBlock();	
		pararchive.router.navigate('/what/',{trigger:true});
	},

	/*
		changing the appearance of the list to reflect the block being editted.
	*/		
	selectBlock:function(id)
	{
		var block = this.$el.find('.block_'+id);
		block.addClass('current');
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