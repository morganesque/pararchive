var StoryPanel = Backbone.View.extend(
{
	events:{
		'click .block': "onBlockClick"
	},

	initialize:function()
	{		
		this.user = pararchive.user;
		
		this.listenTo(this.model, "reset", this.addBlocks);
		this.listenTo(this.model, "add", this.addBlocks);

		this.template = this.$el.find('.story__blocks .block').remove();
		this.blocks = this.$el.find('.story__blocks'); 
	},

	addBlocks:function()
	{
		this.blocks.empty();

		_.each(this.model.models,function(m,i)
		{
			console.log(m.get('id'));		

			var n = this.template.clone();
			n.attr('href','#'+m.get('id'));
			n.text(i+1);

			this.blocks.append(n);					
		},this);
	},

	onBlockClick:function(e)
	{
		e.preventDefault();
		var id = $(e.currentTarget).attr('href').substr(1);

		var block = pararchive.story.get(id);
		pararchive.control.model = block;		


	},
});