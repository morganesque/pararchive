var HeaderView = Marionette.ItemView.extend(
{
	el:'#header',
	template:false,

	ui: {
		story:'.story',
		name:'.story-name',
		author:'.story-author',
	},

	events:{
		
	},

	initialize:function(options)
	{
		this.listenTo(this.model, "reset", this.render);
	},

	onRender:function()
	{
		this.ui.name.text(this.model.meta.get('name'));
		this.ui.author.text('by '+pararchive.user.get('firstname')+pararchive.user.get('surname'));
		this.ui.story.show();	
	},	
});