var StoryListView = Marionette.ItemView.extend(
{
	template:'#story-template',

	ui:{
		num:'.some-blocks .num',
		someblocks:'.some-blocks',
		noblocks:'.no-blocks',
		newblockbutton:'.new-block',
	},

	behaviors:{
		NewBlock:{},
	},

	initialize:function()
	{	
		this.listenTo(this.model, "change", this.onChange);		
		this.listenTo(this.model, "reset", this.onReset);		
	},

	onChange:function()
	{
		console.log("StoryListView change");		
		this.render();
	},

	onReset:function()
	{
		console.log("StoryListView reset");		
		this.render();
	},

	onRender:function()
	{				
		if (pararchive.story.length)
		{
			this.ui.someblocks.show();
			this.ui.noblocks.hide();

			if (pararchive.story.length == 1) this.ui.num.text('1 block');
			else this.ui.num.text(pararchive.story.length+' blocks');

		} else {
			this.ui.someblocks.hide();
			this.ui.noblocks.show();
		}		
	},

});