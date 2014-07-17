var StoryPanel = Backbone.View.extend(
{
	events:{
		
	},

	initialize:function()
	{
		this.user = pararchive.user;
		this.listenTo(this.model, "change", this.render);
	},

	render:function()
	{

	},

});