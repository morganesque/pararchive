var HeaderView = Marionette.ItemView.extend(
{
	el:'#header',
	template:false,

	ui: {
		logo:'.logo',
		story:'.story',
		name:'.story-name',
		author:'.story-author',
	},

	events:{
		'click @ui.logo': "onLogoClick",
	},

	initialize:function(options)
	{
		// console.log("HeaderView\tinitialize");				
		this.listenTo(this.model, "meta", this.render);
		this.listenTo(pararchive.vent, "storyname:hide", this.clearName);
	},

	onRender:function()
	{
		if (this.model.meta) this.ui.name.text(this.model.meta.get('name')+' ');

		this.ui.author.html('&mdash; '+pararchive.user.get('firstname')+' '+pararchive.user.get('surname'));
		this.ui.story.show();	
	},	

	clearName:function()
	{
		// console.log("HeaderView\t clearName");		
		if (this.ui.story) this.ui.story.hide();
	},

	onLogoClick:function(e)
	{
		e.preventDefault();
		pararchive.nav.allStories();
	},
});